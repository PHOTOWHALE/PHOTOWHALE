'use client';

import { ChangeEvent } from 'react';
import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  rectSortingStrategy,
} from '@dnd-kit/sortable';

import { useFrameStore, Layout } from '@/stores/useFrameStore';
import SortableItem from '@/components/common/SortableItem';
import { COLORS } from '@/types/colors';
import useSkinStore from '@/stores/useSkinStore';
import { SKINS } from '@/types/skins';
import Image from 'next/image';

const LAYOUT_TO_COUNT: Record<Layout, number> = {
  '1x2': 2,
  '1x3': 3,
  '1x4': 4,
  '2x2': 4,
};

interface PhotoFrameProps {
  enableDnd?: boolean;
}

export default function PhotoFrame({ enableDnd = true }: PhotoFrameProps) {
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
      activationConstraint: { distance: 10 },
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    if (!enableDnd) return;

    const { active, over } = event;
    if (!over) return;
    if (active.id === over.id) return;

    reorderImages(active.id as number, over.id as number);
  };

  const handleChangeFile = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImage(index, reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const frameBgClass = COLORS.find(c => c.id === bgColorId)?.color || 'bg-white';
  const frameSkin = SKINS.find(s => s.id === skin)?.src || '';

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className={`${frameWidthClass} rounded-xl p-3 shadow-2xl ${frameBgClass}`}
        style={
          frameSkin
            ? { backgroundImage: `url(${frameSkin})`, backgroundSize: 'contain' }
            : undefined
        }
      >
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext
            items={Array.from({ length: visibleCount }, (_, i) => i)}
            strategy={isGrid ? rectSortingStrategy : verticalListSortingStrategy}
          >
            <div
              className={`
                  mt-1 pl-4 text-start text-sm font-bold text-sky-700/70
                  ${isGrid ? 'col-span-2' : ''}
                `}
            >
              PHOTO GRAY
            </div>
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
                  onChange={e => handleChangeFile(idx, e)}
                  totalCount={visibleCount}
                />
              ))}

              <div
                className={`mt-2 text-center text-[10px] text-sky-700/70 relative w-[100px] h-[50px] mx-auto ${isGrid ? 'col-span-2' : ''}`}
              >
                <Image
                  src="/images/icon/logo/photo-whale-logo.png"
                  alt="Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}
