'use client';

import { ChangeEvent } from 'react';
import { useFrameStore, Layout } from '@/store/useFrameStore';

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
  const bg = useFrameStore(state => state.bg);

  const handleChangeFile = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);

    const old = images[index];
    if (old) URL.revokeObjectURL(old);

    setImage(index, url);
  };

  const visibleCount = LAYOUT_TO_COUNT[layout];
  const isGrid = layout === '2x2';
  const frameWidthClass = isGrid ? 'w-[400px]' : 'w-[260px]';

  const frameBgClass = bg === 'white' ? 'bg-white' : bg === 'pink' ? 'bg-rose-50' : 'bg-sky-50';

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
            <label key={idx} className="block cursor-pointer">
              <div
                className={[
                  'relative w-full overflow-hidden rounded-sm bg-slate-500/90 flex items-center justify-center',
                  isGrid ? 'aspect-square' : 'aspect-[3/2]',
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
