'use client';

import { ChangeEvent, useRef } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export default function SortableItem({
  id,
  image,
  isGrid,
  onChange,
}: {
  id: number;
  image: string | null;
  isGrid: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    if (isDragging) return;
    inputRef.current?.click();
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="cursor-grab active:cursor-grabbing select-none"
    >
      <div
        onClick={handleClick}
        className={[
          'relative w-full overflow-hidden rounded-sm bg-slate-500/90 flex items-center justify-center',
          isGrid ? 'aspect-square' : 'aspect-3/2', // ← aspect-3/2 말고 이게 맞음
        ].join(' ')}
      >
        {image ? (
          <img src={image} className="h-full w-full object-cover pointer-events-none" />
        ) : (
          <span className="text-xs text-sky-100/80 pointer-events-none">클릭해서 사진 선택</span>
        )}
      </div>

      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={onChange} />
    </div>
  );
}
