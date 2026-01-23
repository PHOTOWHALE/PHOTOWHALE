'use client';

import Button from '@/components/common/Button';
import PhotoFrame from '@/components/common/PhotoFrame';
import { Toast } from '@/components/common/Toast';
import { GA_CTA_EVENTS } from '@/constants/ga';
import { LAYOUT_TO_COUNT } from '@/constants/layout';
import { useFrameStore } from '@/stores/useFrameStore';
import { sendGAEvent } from '@next/third-parties/google';
import { useRouter } from 'next/navigation';
import Modal from '@/components/common/Modal';
import { useModal } from '@/hooks/useModal';

export default function ViewPageContent() {
  const { isOpen, setIsOpen, open, close } = useModal();
  const router = useRouter();
  const layout = useFrameStore(s => s.layout);
  const images = useFrameStore(s => s.images);
  const resetImages = useFrameStore(s => s.resetImages);

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

  const handleResetConfirm = () => {
    resetImages();
    close();
    Toast.success('사진이 모두 초기화되었습니다');
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

      <div className="w-full max-w-[260px] mt-6 flex flex-col gap-3">
        <div className="flex gap-3 w-full">
          <Button variant="secondary" onClick={handleBack} full>
            이전으로
          </Button>

          <Button variant="primary" onClick={handleConfirm} full>
            선택 완료
          </Button>
        </div>

        <Button variant="secondary" onClick={open} full>
          사진 비우기
        </Button>
      </div>
      <Modal
        isOpen={isOpen}
        onToggle={setIsOpen}
        title="사진을 모두 삭제할까요?"
        description="현재 선택한 사진이 전부 초기화됩니다."
        onConfirm={handleResetConfirm}
      />
    </main>
  );
}
