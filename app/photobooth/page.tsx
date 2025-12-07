'use client';

import PhotoFrame from '@/component/ui/PhotoFrame';
import { useRouter } from 'next/navigation';

export default function PhotoBooth() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-2 items-center justify-center">
      <div className="absolute top-4 inset-x-4 bg-amber-950 h-20 flex justify-center items-center text-white font-bold">
        Step Indicator
      </div>
      <p className="pt-10">사진 넣기 페이지</p>
      <PhotoFrame />
      <button onClick={() => router.push('/result')}>다음</button>
    </div>
  );
}
