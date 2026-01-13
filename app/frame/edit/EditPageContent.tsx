'use client';

import PhotoFrame from '@/components/common/PhotoFrame';
import { useFrameStore } from '@/stores/useFrameStore';
import useSkinStore from '@/stores/useSkinStore';
import { useRef, useState } from 'react';
import SwiperType from 'swiper';
import Carousel from '@/components/common/Carousel';
import { SwiperSlide } from 'swiper/react';
import { COLORS } from '@/types/colors';
import { SKINS } from '@/types/skins';
import Image from 'next/image';
import { exportImage } from '@/utils/exportImage';
import Button from '@/components/common/Button';
import { useRouter } from 'next/navigation';
import { sendGAEvent } from '@next/third-parties/google';
import { GA_CTA_EVENTS } from '@/constants/ga';
import resetFrameStores from '@/utils/resetFrameStores';
import { useCanShare } from '@/hooks/useCanShare';
import { getCurrentTime } from '@/utils/time';
import { Toast } from '@/components/common/Toast';

type BtnClickEventType = 'skin' | 'color';

export default function EditPageContent() {
  const router = useRouter();
  const canShare = useCanShare();

  const [isSaving, setIsSaving] = useState(false);

  const swiperColorRef = useRef<SwiperType | null>(null);
  const swiperSkinRef = useRef<SwiperType | null>(null);

  const captureRef = useRef<HTMLDivElement | null>(null);

  const bgColor = useFrameStore(s => s.color);
  const setbgColor = useFrameStore(s => s.setColor);

  const skin = useSkinStore(s => s.skin);
  const setSkin = useSkinStore(s => s.setSkin);

  const handleBackClick = () => {
    router.back();
  };

  const handleCarouselClick = (type: BtnClickEventType, id: string, index: number) => {
    if (type === 'color') {
      setbgColor(id);
      swiperColorRef.current?.slideToLoop(index);
    } else {
      setSkin(id);
      swiperSkinRef.current?.slideToLoop(index);
    }
  };

  const colorInitialSlide = COLORS.findIndex(c => c.id === bgColor);
  const skinInitialSlideSkin = SKINS.findIndex(s => s.id === skin);

  const handleRestartClick = () => {
    sendGAEvent('event', GA_CTA_EVENTS.clickReStart, {
      page: 'edit',
    });

    router.push('/frame/select');
    resetFrameStores();
    sendGAEvent(GA_CTA_EVENTS.clickReStart);
  };

  const handleSaveClick = async () => {
    const node = captureRef.current;
    if (!node) return;

    setIsSaving(true);

    sendGAEvent('event', GA_CTA_EVENTS.clickDownloadPhotoSubmit, {
      page: 'edit',
      frame_color: bgColor,
      skin,
    });

    try {
      await exportImage(node, { pixelRatio: 2 });

      sendGAEvent('event', GA_CTA_EVENTS.clickDownloadPhotoSuccess, {
        page: 'edit',
        frame_color: bgColor,
        skin,
      });

      Toast.success('이미지가 저장되었어요! 🐳');
    } catch (err) {
      sendGAEvent('event', GA_CTA_EVENTS.clickDownloadPhotoFail, {
        page: 'edit',
        reason: err instanceof Error ? err.message : 'unknown',
      });

      console.error(err);
      Toast.error('이미지 저장에 실패했어요. 🐳');
    } finally {
      setIsSaving(false);
    }
  };

  const handleShareClick = async () => {
    const node = captureRef.current;
    if (!node) return;

    try {
      const blob = await exportImage(node, {
        pixelRatio: 2,
        returnBlob: true,
      });

      const file = new File([blob], `PHOTOWHALE_${getCurrentTime()}.png`, {
        type: 'image/png',
      });

      await navigator.share({
        files: [file],
        title: 'Photo Whale',
        text: '내가 만든 프레임 사진이야 🐳',
      });
    } catch (err) {
      console.log('share canceled or failed', err);
    }
  };

  return (
    <div className="flex flex-col w-full items-center">
      {isSaving && (
        <div className="fixed inset-0 z-9999 bg-black/50 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-white border-t-transparent" />
            <span className="text-sm text-white font-medium">이미지 저장 중…</span>
          </div>
        </div>
      )}
      <div className="flex flex-col gap-5 w-full items-center">
        {/* 프레임 색상 */}
        <div className="flex flex-col gap-2 w-[70%] text-center pt-8">
          <p className="font-semibold">프레임 색상</p>
          <Carousel swiperRef={swiperColorRef} initialSlide={colorInitialSlide}>
            {COLORS.map((c, index) => (
              <SwiperSlide key={c.id}>
                <div className="flex justify-center items-center">
                  <div
                    className={`w-10 h-10 md:w-12 md:h-12 bg-white/50 rounded-full border-3 flex justify-center items-center ${
                      bgColor === c.id ? 'border-black' : 'border-transparent'
                    }`}
                  >
                    <button
                      type="button"
                      className={`w-6.5 h-6.5 md:w-8 md:h-8 rounded-full ${c.color}`}
                      onClick={() => handleCarouselClick('color', c.id, index)}
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Carousel>
        </div>

        {/* 프레임 스킨 */}
        <div className="flex flex-col gap-2 w-[70%] text-center">
          <p className="font-semibold">프레임 스킨</p>
          <Carousel swiperRef={swiperSkinRef} initialSlide={skinInitialSlideSkin}>
            {SKINS.map((s, index) => (
              <SwiperSlide key={s.id}>
                <div className="flex justify-center items-center">
                  <div
                    className={`w-12 h-12 md:w-16 md:h-16 bg-white/50 rounded-xl border-3 flex justify-center items-center ${
                      skin === s.id ? 'border-black' : 'border-transparent'
                    }`}
                  >
                    <button type="button" onClick={() => handleCarouselClick('skin', s.id, index)}>
                      <Image
                        src={s.icon || '/images/icon/default-icon.png'}
                        alt={s.id}
                        width={48}
                        height={48}
                        className="w-9 h-9 md:w-12 md:h-12 rounded-xl"
                      />
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Carousel>
        </div>

        <div className="flex flex-col gap-2 items-center mt-8">
          <div ref={captureRef}>
            <PhotoFrame enableImageChange={false} />
          </div>
        </div>

        <div className="w-full max-w-[320px] mt-6 flex flex-col gap-3">
          <div className="flex gap-3 w-full">
            <Button variant="secondary" onClick={handleBackClick} full>
              이전으로
            </Button>

            <Button variant="primary" type="button" full onClick={handleSaveClick}>
              저장하기
            </Button>
          </div>

          <Button variant="secondary" onClick={handleRestartClick} full>
            다시 만들기
          </Button>

          {canShare && (
            <Button variant="primary" type="button" full onClick={handleShareClick}>
              공유하기
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
