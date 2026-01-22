import StepBar from '@/components/common/StepBar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* 아이콘 프리로딩 */}
      <link rel="preload" as="image" href="/images/icon/logo/photo-whale-logo.webp" />
      <link rel="preload" as="image" href="/images/icon/logo/photo-whale-xmas-logo.webp" />

      <div className="w-full flex justify-center">
        <StepBar />
      </div>

      <div className="flex-1 flex flex-col w-full items-center justify-center">{children}</div>
    </>
  );
}
