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
import Modal from '@/components/common/Modal';
import { useModal } from '@/hooks/useModal';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { FILTERS } from '@/types/filter';
import useFilterStore from '@/stores/useFilterStore';

type BtnClickEventType = 'skin' | 'color' | 'filter';

export default function EditPageContent() {
  const router = useRouter();
  const canShare = useCanShare();

  const [isSaving, setIsSaving] = useState(false);
  const { isOpen, setIsOpen, open, close } = useModal();

  const swiperColorRef = useRef<SwiperType | null>(null);
  const swiperSkinRef = useRef<SwiperType | null>(null);
  const swiperFilterRef = useRef<SwiperType | null>(null);

  const captureRef = useRef<HTMLDivElement | null>(null);

  const bgColor = useFrameStore(s => s.color);
  const setbgColor = useFrameStore(s => s.setColor);

  const skin = useSkinStore(s => s.skin);
  const setSkin = useSkinStore(s => s.setSkin);

  const filter = useFilterStore(s => s.filter);
  const setFilter = useFilterStore(s => s.setFilter);

  const handleBackClick = () => {
    router.back();
  };

  const handleCarouselClick = (type: BtnClickEventType, id: string, index: number) => {
    if (type === 'color') {
      setbgColor(id);
      swiperColorRef.current?.slideToLoop(index);
    } else if (type === 'skin') {
      setSkin(id);
      swiperSkinRef.current?.slideToLoop(index);
    } else {
      setFilter(id);
      swiperFilterRef.current?.slideToLoop(index);
    }
  };

  const handleCarouselReset = (type: BtnClickEventType) => {
    if (type === 'color' && swiperColorRef.current) {
      swiperColorRef.current.slideToLoop(0);
      setbgColor('none');
    }

    if (type === 'skin' && swiperSkinRef.current) {
      swiperSkinRef.current.slideToLoop(0);
      setSkin('none');
    }

    if (type === 'filter' && swiperFilterRef.current) {
      swiperFilterRef.current.slideToLoop(0);
      setFilter('none');
    }
  };

  const colorInitialSlide = COLORS.findIndex(c => c.id === bgColor);
  const skinInitialSlideSkin = SKINS.findIndex(s => s.id === skin);
  const filterInitialSlide = FILTERS.findIndex(f => f.id === filter);

  const handleRestartClick = () => {
    sendGAEvent('event', GA_CTA_EVENTS.clickReStart, {
      page: 'edit',
    });

    close();
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
        text: '내가 만든 프레임 사진이야 🐳\nhttps://photowhale.vercel.app',
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
          <div className="flex gap-1.5 justify-center items-center">
            <p className="font-semibold">프레임 색상</p>
            <button
              className="bg-white/50 rounded-md w-5 h-5 flex justify-center items-center cursor-pointer hover:scale-110"
              onClick={() => handleCarouselReset('color')}
            >
              <ArrowPathIcon className="w-4 h-4 transition-transform active:rotate-360" />
            </button>
          </div>

          <Carousel
            swiperRef={swiperColorRef}
            initialSlide={colorInitialSlide}
            disabled={skin !== 'none'}
          >
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
                      className="w-full h-full flex justify-center items-center cursor-pointer focus:outline-none"
                      onClick={() => handleCarouselClick('color', c.id, index)}
                    >
                      <span className={`w-6.5 h-6.5 md:w-8 md:h-8 rounded-full ${c.color}`} />
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Carousel>
        </div>

        {/* 프레임 스킨 */}
        <div className="flex flex-col gap-2 w-[70%] text-center">
          <div className="flex gap-1.5 justify-center items-center">
            <p className="font-semibold">프레임 스킨</p>
            <button
              className="bg-white/50 rounded-md w-5 h-5 flex justify-center items-center cursor-pointer hover:scale-110"
              onClick={() => handleCarouselReset('skin')}
            >
              <ArrowPathIcon className="w-4 h-4 transition-transform active:rotate-360" />
            </button>
          </div>
          <Carousel
            swiperRef={swiperSkinRef}
            initialSlide={skinInitialSlideSkin}
            disabled={bgColor !== 'none'}
          >
            {SKINS.map((s, index) => (
              <SwiperSlide key={s.id}>
                <div className="flex justify-center items-center">
                  <div
                    className={`w-12 h-12 md:w-16 md:h-16 bg-white/50 rounded-xl border-3 flex justify-center items-center cursor-pointer ${
                      skin === s.id ? 'border-black' : 'border-transparent'
                    }`}
                  >
                    <button
                      type="button"
                      className="w-full h-full flex justify-center items-center cursor-pointer"
                      onClick={() => handleCarouselClick('skin', s.id, index)}
                    >
                      <Image
                        src={s.icon}
                        alt={s.id}
                        width={48}
                        height={48}
                        priority
                        className="w-9 h-9 md:w-12 md:h-12 rounded-xl"
                      />
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Carousel>
        </div>

        {/* 필터 */}
        <div className="flex flex-col gap-2 w-[70%] text-center">
          <div className="flex gap-1.5 justify-center items-center">
            <p className="font-semibold">필터</p>
            <button
              className="bg-white/50 rounded-md w-5 h-5 flex justify-center items-center cursor-pointer hover:scale-110"
              onClick={() => handleCarouselReset('filter')}
            >
              <ArrowPathIcon className="w-4 h-4 transition-transform active:rotate-360" />
            </button>
          </div>
          <Carousel
            swiperRef={swiperFilterRef}
            initialSlide={filterInitialSlide}
            slidesPerView={5}
            slidesPerViewMobile={3}
          >
            {FILTERS.map((f, index) => (
              <SwiperSlide key={f.id}>
                <div className="flex justify-center items-center">
                  <div
                    className={`w-20 h-10 bg-white/50 rounded-full flex justify-center items-center cursor-pointer ${
                      filter === f.id ? 'border-black border-3' : 'border-transparent border-3'
                    }`}
                    onClick={() => handleCarouselClick('filter', f.id, index)}
                  >
                    <span className="text-sm text-gray-500">{f.label}</span>
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

        <div className="w-full max-w-[260px] mt-6 flex flex-col gap-3">
          <div className="flex gap-3 w-full">
            <Button variant="secondary" onClick={handleBackClick} full>
              이전으로
            </Button>

            <Button variant="primary" full onClick={handleSaveClick}>
              저장하기
            </Button>
          </div>

          <Button variant="secondary" onClick={open} full>
            다시 만들기
          </Button>

          {canShare && (
            <Button variant="primary" full onClick={handleShareClick}>
              공유하기
            </Button>
          )}
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        onToggle={setIsOpen}
        title="진행사항이 모두 초기화됩니다!"
        description="계속 진행하시겠습니까?"
        onConfirm={handleRestartClick}
      />
    </div>
  );
}
