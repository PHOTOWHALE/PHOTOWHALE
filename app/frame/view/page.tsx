'use client';

import Button from '@/components/common/Button';
import PhotoFrame from '@/components/common/PhotoFrame';
import { useProgressStore } from '@/stores/useProgressStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function FrameViewPage() {
  const router = useRouter();
  const setStep = useProgressStore(state => state.setStep);

  useEffect(() => {
    setStep(2);
  }, [setStep]);

  const goNext = () => {
    router.push('/frame/edit');
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4">
      <PhotoFrame />

      <Button
        type="button"
        onClick={goNext}
        className="
          mt-6 px-4 py-2 rounded-xl 
          bg-black text-white font-semibold 
          hover:bg-neutral-800 transition-colors
        "
      >
        선택 완료
      </Button>
    </main>
  );
}
