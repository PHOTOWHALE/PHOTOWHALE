'use client';

import { ChangeEvent, useRef } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { getCurrentTimestamp } from '@/utils/time';
import { digitalix } from '@/utils/font';

export default function SortableItem({
  id,
  image,
  isGrid,
  disabled = false,
  onChange,
  totalCount,
}: {
  id: number;
  image: string | null;
  isGrid: boolean;
  disabled?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  totalCount: number;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
    disabled,
  });

  const wrapperStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 20 : 0,
  };

  const inputRef = useRef<HTMLInputElement | null>(null);
  const curTime = getCurrentTimestamp();

  const handleClick = () => {
    if (isDragging) return;
    inputRef.current?.click();
  };

  // disabled일는 drag 관련 props 제거
  const dragProps = disabled ? {} : { ...attributes, ...listeners };

  return (
    <div
      ref={setNodeRef}
      style={wrapperStyle}
      {...dragProps}
      className={`
        select-none
        ${disabled ? 'cursor-default' : 'cursor-grab active:cursor-grabbing'}
      `}
    >
      <div
        onClick={handleClick}
        className={`
          relative w-full overflow-hidden rounded-sm bg-slate-500
          flex items-center justify-center
          transition-transform duration-150 ease-out
          ${isDragging && !disabled ? 'scale-120 shadow-lg' : 'scale-100 shadow-none'}
          ${isGrid ? 'aspect-4/5' : 'aspect-3/2'}
        `}
      >
        {id === totalCount - 1 && (
          <span
            className={`absolute right-2 bottom-2 z-10 text-[8px] text-amber-300/90 px-2 py-0.5 rounded ${digitalix.className}`}
          >
            {curTime}
          </span>
        )}
        {image ? (
          <img src={image} className="h-full w-full object-cover pointer-events-none" />
        ) : (
          <span className="text-xs text-sky-100 pointer-events-none">클릭해서 사진 선택</span>
        )}
      </div>

      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={onChange} />
    </div>
  );
}
