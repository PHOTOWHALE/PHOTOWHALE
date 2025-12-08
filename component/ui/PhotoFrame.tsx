'use client';

import { ChangeEvent, useState } from 'react';
import { useFrameStore, Layout } from '@/store/useFrameStore';
import { COLORS } from '@/types/colors';

const LAYOUT_TO_COUNT: Record<Layout, number> = {
  '1x2': 2,
  '1x3': 3,
  '1x4': 4,
  '2x2': 4,
};

export default function PhotoFrame() {
  const layout = useFrameStore(state => state.layout);
  const images = useFrameStore(state => state.images);
  const setImage = useFrameStore(state => state.setImage);
  const reorderImages = useFrameStore(state => state.reorderImages);
  const bgColorId = useFrameStore(state => state.color);

  const [dragIndex, setDragIndex] = useState<number | null>(null);

  const handleChangeFile = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);

    const old = images[index];
    if (old) URL.revokeObjectURL(old);

    setImage(index, url);
  };

  const handleDragStart = (index: number) => {
    if (!images[index]) return;
    setDragIndex(index);
  };

  const handleDrop = (index: number) => {
    if (dragIndex === null || dragIndex === index) return;
    reorderImages(dragIndex, index);
    setDragIndex(null);
  };

  const handleDragOver: React.DragEventHandler<HTMLLabelElement> = e => {
    e.preventDefault(); // drop 허용
  };

  const visibleCount = LAYOUT_TO_COUNT[layout];
  const isGrid = layout === '2x2';
  const frameWidthClass = isGrid ? 'w-[400px]' : 'w-[260px]';

  const frameBgClass = COLORS.find(c => c.id === bgColorId)?.color || 'bg-white';

  return (
    <div className="flex flex-col items-center gap-4">
      <div className={[frameWidthClass, 'rounded-xl p-3 shadow-2xl', frameBgClass].join(' ')}>
        <div
          className={[
            'rounded-lg p-3',
            isGrid ? 'grid grid-cols-2 gap-3' : 'flex flex-col gap-3',
          ].join(' ')}
        >
          {images.slice(0, visibleCount).map((image, idx) => (
            <label
              key={idx}
              className={
                'block cursor-pointer border border-transparent ' +
                (dragIndex === idx ? 'opacity-70' : '')
              }
              draggable={!!image} // 이미지 있을 때만 드래그 가능
              onDragStart={() => handleDragStart(idx)}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(idx)}
            >
              <div
                className={[
                  'relative w-full overflow-hidden rounded-sm bg-slate-500/90 flex items-center justify-center transition-colors',
                  isGrid ? 'aspect-square' : 'aspect-[3/2]',
                  dragIndex !== null && dragIndex !== idx ? 'hover:ring-2 hover:ring-rose-300' : '',
                ].join(' ')}
              >
                {image ? (
                  <img
                    src={image}
                    alt={`photo-${idx + 1}`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-xs text-sky-100/80">클릭해서 사진 선택</span>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={e => handleChangeFile(idx, e)}
              />
            </label>
          ))}

          <div
            className={[
              'mt-1 text-center text-[10px] text-sky-700/70',
              isGrid ? 'col-span-2' : '',
            ].join(' ')}
          >
            Time Film
          </div>
        </div>
      </div>
    </div>
  );
}
