'use client';

import { useFrameStore } from '@/store/frameStore';
import Frame from '@/components/common/Frame';

export default function Deco() {
  const frame = useFrameStore(s => s.selectedFrame);

  return (
    <div className="flex flex-col gap-2 items-center justify-center">
      <div>꾸미기 페이지</div>
      <Frame code={frame} />
    </div>
  );
}
