'use client';

import { useFrameStore } from '@/store/frameStore';
import { useRouter } from 'next/navigation';

export default function FrameButtons() {
  const setFrame = useFrameStore(s => s.setSelectedFrame);
  const router = useRouter();

  const handleClick = (code: string) => {
    setFrame(code);
    router.push('/photobooth');
  };

  return (
    <div className="flex flex-col gap-2">
      <button onClick={() => handleClick('1')}>1*2</button>
      <button onClick={() => handleClick('2')}>1*3</button>
      <button onClick={() => handleClick('3')}>1*4</button>
      <button onClick={() => handleClick('4')}>2*2</button>
    </div>
  );
}
