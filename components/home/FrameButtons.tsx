'use client';

import { useFrameStore, FrameState } from '@/stores/useFrameStore';
import { useRouter } from 'next/navigation';

export default function FrameButtons() {
  const setLayout = useFrameStore(s => s.setLayout);
  const router = useRouter();

  const handleClick = (code: FrameState['layout']) => {
    setLayout(code);
    router.push('/photobooth');
  };

  return (
    <div className="flex flex-col gap-2">
      <button onClick={() => handleClick('1x2')}>1*2</button>
      <button onClick={() => handleClick('1x3')}>1*3</button>
      <button onClick={() => handleClick('1x4')}>1*4</button>
      <button onClick={() => handleClick('2x2')}>2*2</button>
    </div>
  );
}
