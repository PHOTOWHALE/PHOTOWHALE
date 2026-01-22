'use client';

import Button from '@/components/common/Button';
import PhotoFrame from '@/components/common/PhotoFrame';
import { useRouter } from 'next/navigation';
import { GA_CTA_EVENTS } from '@/constants/ga';
import { sendGAEvent } from '@next/third-parties/google';
import { SKINS } from '@/types/skins';
import { useFrameStore } from '@/stores/useFrameStore';
import { Toast } from '@/components/common/Toast';
import { LAYOUT_TO_COUNT } from '@/constants/layout';

export default function ViewPageContent() {
  const router = useRouter();
  const layout = useFrameStore(s => s.layout);
  const images = useFrameStore(s => s.images);

  const requiredImageCount = LAYOUT_TO_COUNT[layout];
  const visibleImages = images.slice(0, requiredImageCount);
  const isImageFull = visibleImages.every(img => img !== null);

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

    if (!isImageFull) {
      Toast.error('모든 사진을 업로드 해주세요. 🐳');
      return;
    }

    router.push('/frame/edit');
  };

  return (
    <main className="flex flex-col items-center justify-center gap-4">
      <PhotoFrame />

      <div className="mt-6 grid grid-cols-2 gap-3 w-full max-w-[260px]">
        <Button variant="secondary" full onClick={handleBack}>
          이전으로
        </Button>

        <Button variant="primary" full onClick={handleConfirm}>
          선택 완료
        </Button>
      </div>
    </main>
  );
}
