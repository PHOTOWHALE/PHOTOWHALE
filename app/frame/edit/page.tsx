'use client';

import PhotoFrame from '@/components/common/PhotoFrame';
import { useFrameStore } from '@/stores/useFrameStore';
import useSkinStore from '@/stores/useSkinStore';
import { useProgressStore } from '@/stores/useProgressStore';
import { useEffect, useRef } from 'react';
import SwiperType from 'swiper';
import Carousel from '@/components/common/Carousel';
import { SwiperSlide } from 'swiper/react';
import { COLORS } from '@/types/colors';
import { SKINS } from '@/types/skins';
import Image from 'next/image';

type BtnClickEventType = 'skin' | 'color';

export default function FrameEditPage() {
  const swiperColorRef = useRef<SwiperType | null>(null);
  const swiperSkinRef = useRef<SwiperType | null>(null);

  const bgColor = useFrameStore(s => s.color);
  const setbgColor = useFrameStore(s => s.setColor);

  const skin = useSkinStore(s => s.skin);
  const setSkin = useSkinStore(s => s.setSkin);

  const setStep = useProgressStore(state => state.setStep);

  useEffect(() => {
    setStep(3);
  }, [setStep]);

  const handleButtonClick = (type: BtnClickEventType, id: string, index: number) => {
    if (type === 'color') {
      setbgColor(id);
      if (swiperColorRef.current) {
        swiperColorRef.current.slideToLoop(index, 300);
      }
    } else if (type === 'skin') {
      setSkin(id);
      if (swiperSkinRef.current) {
        swiperSkinRef.current.slideToLoop(index, 300);
      }
    }
  };

  const colorInitialSlide = COLORS.findIndex(c => c.id === bgColor);
  const skinInitialSlideSkin = SKINS.findIndex(s => s.id === skin);

  return (
    <div className="flex flex-col w-full items-center">
      <div className="flex flex-col gap-5 w-full items-center">
        <div className="flex flex-col gap-2 w-[70%] text-center pt-10">
          <p>프레임 색상</p>
          <Carousel swiperRef={swiperColorRef} initialSlide={colorInitialSlide}>
            {COLORS.map((c, index) => (
              <SwiperSlide key={c.id}>
                <div className="flex justify-center items-center">
                  <div
                    className={`w-12 h-12 bg-white/50 rounded-full border-2 flex justify-center items-center ${bgColor === c.id ? 'border-black' : 'border-transparent'}`}
                  >
                    <button
                      className={`w-8 h-8 rounded-full ${c.color}`}
                      onClick={() => handleButtonClick('color', c.id, index)}
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Carousel>
        </div>
        <div className="flex flex-col gap-2 w-[70%] text-center">
          <p>프레임 스킨</p>
          <Carousel swiperRef={swiperSkinRef} initialSlide={skinInitialSlideSkin}>
            {SKINS.map((s, index) => (
              <SwiperSlide key={s.id}>
                <div className="flex justify-center items-center">
                  <div
                    className={`w-12 h-12 bg-white/50 rounded-full border-2 flex justify-center items-center ${skin === s.id ? 'border-black' : 'border-transparent'}`}
                  >
                    <button
                      className={`w-8 h-8 rounded-full`}
                      onClick={() => handleButtonClick('skin', s.id, index)}
                    >
                      <Image
                        src={s.icon || '/images/icon/default-icon.png'}
                        alt={s.id}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Carousel>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <p>결과물</p>
          <div>
            <PhotoFrame enableDnd={false} />
          </div>
        </div>
        <div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">다시 만들기</button>
          <button className="bg-green-500 text-white px-4 py-2 rounded ml-2">저장하기</button>
        </div>
      </div>
    </div>
  );
}
