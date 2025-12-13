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

  return (
    <main className="flex flex-col items-center justify-center gap-4">
      <PhotoFrame />

      <div className="mt-6 grid grid-cols-2 gap-3 w-full max-w-[320px]">
        <Button variant="secondary" full onClick={() => router.push('/frame/select')}>
          다시 선택
        </Button>

        <Button variant="primary" full onClick={() => router.push('/frame/edit')}>
          선택 완료
        </Button>
      </div>
    </main>
  );
}
