'use client';

import Button from '@/components/common/Button';
import Link from 'next/link';
import { sendGAEvent } from '@next/third-parties/google';
import { GA_CTA_EVENTS } from '@/constants/ga';
import RollingTicker from '@/components/common/homePage/RollingTicker';

export default function Home() {
  const handleStartClick = () => {
    sendGAEvent(GA_CTA_EVENTS.clickStart);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="flex flex-col items-center justify-center w-full absolute">
        <RollingTicker />

        <div className="absolute flex flex-col justify-center items-center gap-4 z-20 text-white">
          <h1 className="font-bold text-4xl">PHOTOWHALE</h1>
          <p>Capture your moments with us</p>
          <Link href="/frame/select" onClick={handleStartClick}>
            <Button>만들러 가기</Button>
          </Link>
        </div>
      </div>
      <div className="absolute inset-0 bg-black/80 z-10" />
    </div>
  );
}
