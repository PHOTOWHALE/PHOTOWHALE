import Button from '@/components/common/Button';
import Link from 'next/link';
import { sendGAEvent } from '@next/third-parties/google';
import { GA_CTA_EVENTS } from '@/constants/ga';

export default function Home() {
  const handleStartClick = () => {
    sendGAEvent(GA_CTA_EVENTS.clickStart);
  };
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <p>랜딩 페이지</p>
      <Link href="/frame/select" onClick={handleStartClick}>
        <Button>만들러 가기</Button>
      </Link>
    </div>
  );
}
