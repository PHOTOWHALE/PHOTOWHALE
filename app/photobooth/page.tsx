'use client';

import Frame from '@/components/common/Frame';
import { useFrameStore } from '@/store/frameStore';
import { useRouter } from 'next/navigation';

export default function PhotoBooth() {
  const frame = useFrameStore(s => s.selectedFrame);
  const router = useRouter();

  return (
    <div className="flex flex-col gap-2 items-center justify-center">
      <div>사진 넣기 페이지</div>
      <Frame code={frame} />
      <button onClick={() => router.push('/result')}>다음</button>
    </div>
  );
}
