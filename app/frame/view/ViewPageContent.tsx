'use client';

import Button from '@/components/common/Button';
import PhotoFrame from '@/components/common/PhotoFrame';
import { useRouter } from 'next/navigation';
import { GA_CTA_EVENTS } from '@/constants/ga';
import { sendGAEvent } from '@next/third-parties/google';
import { SKINS } from '@/types/skins';
import { useFrameStore } from '@/stores/useFrameStore';
import { Toast } from '@/components/common/Toast';

export default function ViewPageContent() {
  const router = useRouter();
  const images = useFrameStore(s => s.images);
  const unUploadedImages = images.filter(img => img === null);

  const handleBack = () => {
    sendGAEvent('event', GA_CTA_EVENTS.clickReselectFrame, {
      page: 'view',
      cta: 'reselect',
    });

    router.push('/frame/select');
  };

  const handleConfirm = () => {
    sendGAEvent('event', GA_CTA_EVENTS.clickFinishSelectPhoto, {
      page: 'view',
      cta: 'confirm',
    });

    if (unUploadedImages.length > 0) {
      Toast.error('모든 사진을 업로드 해주세요. 🐳');
      return;
    }

    router.push('/frame/edit');
  };

  return (
    <main className="flex flex-col items-center justify-center gap-4">
      {/* 이미지 프리로딩 */}
      {SKINS.filter(s => s.src !== '').map(skin => (
        <link
          key={`preload-${skin.id}`}
          rel="preload"
          as="image"
          href={`/_next/image?url=${encodeURIComponent(skin.src)}&w=750&q=75`}
        />
      ))}
      <PhotoFrame />

      <div className="mt-6 grid grid-cols-2 gap-3 w-full max-w-[320px]">
        <Button variant="secondary" full onClick={handleBack}>
          다시 선택
        </Button>

        <Button variant="primary" full onClick={handleConfirm}>
          선택 완료
        </Button>
      </div>
    </main>
  );
}
