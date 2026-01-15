'use client';

import { ChangeEvent } from 'react';
import type { DragEndEvent } from '@dnd-kit/core';
import {
  DndContext,
  closestCenter,
  TouchSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { useState } from 'react';
import { useFrameStore } from '@/stores/useFrameStore';
import SortableItem from '@/components/common/SortableItem';
import { COLORS } from '@/types/colors';
import useSkinStore from '@/stores/useSkinStore';
import { SKINS } from '@/types/skins';
import { convertHeicToJpeg } from '@/utils/convertHeic';
import { LAYOUT_TO_COUNT } from '@/constants/layout';
import { Toast } from '@/components/common/Toast';

interface PhotoFrameProps {
  enableDnd?: boolean;
  enableImageChange?: boolean;
}

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error('HEIC_CONVERT_TIMEOUT'));
    }, ms);

    promise
      .then(resolve)
      .catch(reject)
      .finally(() => clearTimeout(timer));
  });
}

export default function PhotoFrame({
  enableDnd = true,

  enableImageChange = true,
}: PhotoFrameProps) {
  const [isConverting, setIsConverting] = useState(false);
  const layout = useFrameStore(state => state.layout);
  const images = useFrameStore(state => state.images);
  const setImage = useFrameStore(state => state.setImage);
  const reorderImages = useFrameStore(state => state.reorderImages);
  const bgColorId = useFrameStore(state => state.color);
  const skin = useSkinStore(state => state.skin);

  const visibleCount = LAYOUT_TO_COUNT[layout];
  const isGrid = layout === '2x2';
  const frameWidthClass = isGrid ? 'w-[350px]' : 'w-[260px]';

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 150, tolerance: 5 },
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    if (!enableDnd) return;

    const { active, over } = event;
    if (!over) return;
    if (active.id === over.id) return;

    reorderImages(active.id as number, over.id as number);
  };

  const handleChangeFile = async (index: number, e: ChangeEvent<HTMLInputElement>) => {
    if (!enableImageChange) return;

    const input = e.target;
    const file = input.files?.[0];
    if (!file) return;

    setIsConverting(true);

    try {
      const convertedFile = await withTimeout(convertHeicToJpeg(file), 7000);

      const reader = new FileReader();
      reader.onload = () => {
        setImage(index, reader.result as string);
      };
      reader.readAsDataURL(convertedFile);
    } catch (err) {
      if (err instanceof Error && err.message === 'HEIC_CONVERT_TIMEOUT') {
        Toast.error('사진 변환 시간이 초과되었습니다.\n다른 사진을 선택해 주세요.');
      } else {
        console.error(err);
        Toast.error('사진 변환에 실패했습니다.');
      }
    } finally {
      setIsConverting(false);

      //실패 시 같은 파일 재선택 가능하도록 초기화
      input.value = '';
    }
  };

  const frameBgClass = COLORS.find(c => c.id === bgColorId)?.color || 'bg-white';
  const frameSkin = SKINS.find(s => s.id === skin)?.src || '';

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className={`${frameWidthClass} relative p-3 shadow-2xl ${frameBgClass}`}
        style={
          frameSkin
            ? {
                backgroundImage: `url(${frameSkin})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }
            : undefined
        }
      >
        {isConverting && (
          <div className="absolute inset-0 z-50 bg-black/40  flex items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent" />
              <span className="text-xs text-white">사진 처리 중…</span>
            </div>
          </div>
        )}
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext
            items={Array.from({ length: visibleCount }, (_, i) => i)}
            strategy={isGrid ? rectSortingStrategy : verticalListSortingStrategy}
          >
            <div
              className={`
                rounded-lg p-3
                ${isGrid ? 'grid grid-cols-2 gap-3' : 'flex flex-col gap-3'}
              `}
            >
              {Array.from({ length: visibleCount }, (_, idx) => (
                <SortableItem
                  key={idx}
                  id={idx}
                  image={images[idx]}
                  isGrid={isGrid}
                  disabled={!enableDnd}
                  disableImageChange={!enableImageChange}
                  onChange={e => handleChangeFile(idx, e)}
                  totalCount={visibleCount}
                />
              ))}

              <div className={`mt-2 flex justify-center w-full ${isGrid ? 'col-span-2' : ''}`}>
                <img
                  src={
                    skin?.includes('christmas')
                      ? '/images/icon/logo/photo-whale-xmas-logo.webp'
                      : '/images/icon/logo/photo-whale-logo.webp'
                  }
                  alt="Logo"
                  className="w-20 h-12.5"
                />
              </div>
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}
