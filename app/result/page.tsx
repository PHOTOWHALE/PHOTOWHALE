'use client';

import { useFrameStore } from '@/store/frameStore';
import Frame from '@/components/common/Frame';

export default function Result() {
  const frame = useFrameStore(s => s.selectedFrame);

  return (
    <div className="flex flex-col w-full items-center">
      <div className="bg-amber-950 w-full h-20 flex justify-center items-center text-white font-bold">
        Step Indicator
      </div>
      <div className="flex flex-col gap-5 w-full items-center">
        <div className="flex flex-col gap-2 w-full text-center pt-10">
          <p>프레임 색상</p>
          <div className="grid grid-flow-col gap-4 overflow-auto">
            <div className="bg-amber-300 w-15 aspect-square" />
            <div className="bg-amber-300 w-15 aspect-square" />
            <div className="bg-amber-300 w-15 aspect-square" />
            <div className="bg-amber-300 w-15 aspect-square" />
            <div className="bg-amber-300 w-15 aspect-square" />
            <div className="bg-amber-300 w-15 aspect-square" />
            <div className="bg-amber-300 w-15 aspect-square" />
            <div className="bg-amber-300 w-15 aspect-square" />
            <div className="bg-amber-300 w-15 aspect-square" />
            <div className="bg-amber-300 w-15 aspect-square" />
            <div className="bg-amber-300 w-15 aspect-square" />
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full text-center">
          <p>스티커</p>
          <div className="grid grid-flow-col gap-4 overflow-auto">
            <div className="bg-green-300 w-15 aspect-square" />
            <div className="bg-green-300 w-15 aspect-square" />
            <div className="bg-green-300 w-15 aspect-square" />
            <div className="bg-green-300 w-15 aspect-square" />
            <div className="bg-green-300 w-15 aspect-square" />
            <div className="bg-green-300 w-15 aspect-square" />
            <div className="bg-green-300 w-15 aspect-square" />
            <div className="bg-green-300 w-15 aspect-square" />
            <div className="bg-green-300 w-15 aspect-square" />
            <div className="bg-green-300 w-15 aspect-square" />
            <div className="bg-green-300 w-15 aspect-square" />
          </div>
        </div>
        <div className="flex flex-col gap-2 items-center w-full">
          <p>결과물</p>
          <div>
            <Frame code={frame} />
          </div>
        </div>
        <div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">다시 만들기</button>
          <button className="bg-green-500 text-white px-4 py-2 rounded ml-2">저장하기</button>
        </div>
      </div>
    </div>
  );
}
