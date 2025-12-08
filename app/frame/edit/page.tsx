'use client';

import PhotoFrame from '@/component/ui/PhotoFrame';
import { useFrameStore, FrameBg } from '@/store/useFrameStore';

const BG_OPTIONS: FrameBg[] = ['white', 'pink', 'blue'];

export default function FrameEditPage() {
  const bg = useFrameStore(state => state.color);
  const setBg = useFrameStore(state => state.setColor);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6">
      <PhotoFrame />

      <div className="flex gap-2">
        {BG_OPTIONS.map(option => (
          <button
            key={option}
            type="button"
            onClick={() => setBg(option)}
            className={`
            px-3 py-1 rounded-full border text-xs
            ${bg === option ? 'bg-black text-white' : 'bg-white text-black'}
            `}
          >
            {option}
          </button>
        ))}
      </div>
    </main>
  );
}
