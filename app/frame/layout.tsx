import StepBar from '@/components/common/StepBar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="w-full flex justify-center">
        <StepBar />
      </div>
      <div className="flex-1 flex flex-col w-full items-center justify-center">{children}</div>
    </>
  );
}
