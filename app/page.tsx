import FrameButtons from '@/components/home/FrameButtons';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <p>프레임 선택 페이지</p>
      <FrameButtons />
    </div>
  );
}
