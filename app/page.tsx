import FrameButtons from '@/components/home/FrameButtons';

export default function Home() {
  return (
    <div className="flex flex-col gap-2 items-center justify-center">
      <div>프레임 선택 페이지</div>
      <FrameButtons />
    </div>
  );
}
