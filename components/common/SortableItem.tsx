'use client';

import { ChangeEvent, useRef } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { getCurrentDay } from '@/utils/time';
import { digitalix } from '@/utils/font';
import { GripVertical, ImagePlus } from 'lucide-react';

export default function SortableItem({
  id,
  image,
  isGrid,
  disabled = false,
  disableImageChange = false,
  onChange,
  totalCount,
}: {
  id: number;
  image: string | null;
  isGrid: boolean;
  disabled?: boolean;
  disableImageChange?: boolean;
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
  const curTime = getCurrentDay();

  const handleClick = () => {
    if (isDragging) return;
    if (disableImageChange) return;
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
        select-none touch-none
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
        {!disabled && (
          <div className="absolute top-1 right-1 opacity-60 pointer-events-none">
            <GripVertical size={14} />
          </div>
        )}
        {id === totalCount - 1 && (
          <span
            className={`absolute right-2 bottom-2 z-10 text-[6px] text-amber-300/90 px-2 py-0.5 rounded ${digitalix.className}`}
          >
            {curTime}
          </span>
        )}
        {image ? (
          <img src={image} className="h-full w-full object-cover pointer-events-none" />
        ) : (
          <div className="flex flex-col items-center gap-1 text-white/80">
            <ImagePlus className="w-6 h-6" />
            <span className="text-[10px] opacity-70">7MB 이하 파일</span>
          </div>
        )}
        {!disableImageChange && (
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onChange}
          />
        )}
      </div>
    </div>
  );
}
