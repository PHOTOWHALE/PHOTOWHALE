'use client';

import FrameLayoutGrid from '@/components/common/selectPage/FrameLayoutGrid';

export default function SelectPageContent() {
  return (
    <main className="flex flex-col items-center py-2 px-4">
      <h1 className="text-lg font-semibold mb-6">프레임 비율 선택</h1>
      <FrameLayoutGrid />
    </main>
  );
}
