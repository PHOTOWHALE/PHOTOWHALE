'use client';

import { ChangeEvent } from 'react';
import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  rectSortingStrategy,
} from '@dnd-kit/sortable';

import { useFrameStore, Layout } from '@/store/useFrameStore';
import SortableItem from '@/component/ui/SortableItem';

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
  const bg = useFrameStore(state => state.bg);

  const visibleCount = LAYOUT_TO_COUNT[layout];
  const isGrid = layout === '2x2';
  const frameWidthClass = isGrid ? 'w-[400px]' : 'w-[260px]';

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 10 },
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    if (active.id === over.id) return;

    reorderImages(active.id as number, over.id as number);
  };

  const handleChangeFile = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);

    const old = images[index];
    if (old) URL.revokeObjectURL(old);

    setImage(index, url);
  };

  const frameBgClass = bg === 'white' ? 'bg-white' : bg === 'pink' ? 'bg-rose-50' : 'bg-sky-50';

  return (
    <div className="flex flex-col items-center gap-4">
      <div className={[frameWidthClass, 'rounded-xl p-3 shadow-2xl', frameBgClass].join(' ')}>
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext
            items={Array.from({ length: visibleCount }, (_, i) => i)}
            strategy={isGrid ? rectSortingStrategy : verticalListSortingStrategy}
          >
            <div
              className={[
                'rounded-lg p-3',
                isGrid ? 'grid grid-cols-2 gap-3' : 'flex flex-col gap-3',
              ].join(' ')}
            >
              {Array.from({ length: visibleCount }, (_, idx) => (
                <SortableItem
                  key={idx}
                  id={idx}
                  image={images[idx]}
                  isGrid={isGrid}
                  onChange={e => handleChangeFile(idx, e)}
                />
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
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}
