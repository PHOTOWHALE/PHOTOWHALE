import StepBar from '@/components/common/StepBar';
import { SKINS } from '@/types/skins';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* preload */}
      <>
        <link rel="preload" as="image" href="/images/icon/logo/photo-whale-logo.webp" />
        <link rel="preload" as="image" href="/images/icon/logo/photo-whale-xmas-logo.webp" />
        {SKINS.filter(s => s.src !== '').map(skin => (
          <link key={`preload-${skin.id}`} rel="preload" as="image" href={skin.src} />
        ))}
      </>

      {/* layout */}
      <div className="w-full flex justify-center">
        <StepBar />
      </div>

      <div className="flex-1 flex flex-col w-full items-center justify-center">{children}</div>
    </>
  );
}
