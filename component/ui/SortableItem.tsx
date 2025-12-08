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

  const wrapperStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 20 : 0,
  };

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    if (isDragging) return;
    inputRef.current?.click();
  };

  return (
    <div
      ref={setNodeRef}
      style={wrapperStyle}
      {...attributes}
      {...listeners}
      className="cursor-grab active:cursor-grabbing select-none"
    >
      <div
        onClick={handleClick}
        className={`
        relative w-full overflow-hidden rounded-sm bg-slate-500/90
        flex items-center justify-center
        transition-transform duration-150 ease-out
        ${isDragging ? 'scale-120 shadow-lg' : 'scale-100 shadow-none'}
        ${isGrid ? 'aspect-square' : 'aspect-3/2'}
      `}
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
