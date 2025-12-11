'use client';

import { useRouter } from 'next/navigation';
import { useFrameStore, Layout } from '@/stores/useFrameStore';
import { useEffect } from 'react';
import { useProgressStore } from '@/stores/useProgressStore';

export default function FrameSelectPage() {
  const router = useRouter();
  const setLayout = useFrameStore(state => state.setLayout);
  const setStep = useProgressStore(state => state.setStep);

  useEffect(() => {
    setStep(1);
  }, [setStep]);

  const handleSelect = (layout: Layout) => {
    setLayout(layout);
    router.push('/frame/view');
  };

  return (
    <main className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-lg font-semibold">프레임 비율 선택</h1>
      <div className="flex flex-col gap-4">
        {(['1x2', '1x3', '1x4', '2x2'] as Layout[]).map(option => (
          <button
            key={option}
            onClick={() => handleSelect(option)}
            className="px-4 py-2 rounded-full border border-rose-300 text-rose-400 hover:bg-rose-50"
          >
            {option}
          </button>
        ))}
      </div>
    </main>
  );
}
