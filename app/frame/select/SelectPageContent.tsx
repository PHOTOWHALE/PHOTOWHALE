'use client';

import { useEffect } from 'react';
import { useProgressStore } from '@/stores/useProgressStore';
import FrameLayoutGrid from '@/components/common/selectPage/FrameLayoutGrid';

export default function SelectPageContent() {
  const setStep = useProgressStore(state => state.setStep);

  useEffect(() => {
    setStep(1);
  }, [setStep]);

  return (
    <main className="flex flex-col items-center py-2 px-4">
      <h1 className="text-lg font-semibold mb-6">프레임 비율 선택</h1>
      <FrameLayoutGrid />
    </main>
  );
}
