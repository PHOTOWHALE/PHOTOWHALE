import Button from '@/components/common/Button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <p>랜딩 페이지</p>
      <Link href="/frame/select">
        <Button>만들러 가기</Button>
      </Link>
    </div>
  );
}
