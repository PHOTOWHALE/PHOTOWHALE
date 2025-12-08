'use client';

import PhotoFrame from '@/component/ui/PhotoFrame';
import { useFrameStore } from '@/store/useFrameStore';
import { COLORS } from '@/types/colors';
import { useRef } from 'react';
import { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export default function Result() {
  const swiperRef = useRef<SwiperType | null>(null);
  const bgColor = useFrameStore(s => s.color);
  const setbgColor = useFrameStore(s => s.setColor);

  const handleButtonClick = (colorId: string, index: number) => {
    setbgColor(colorId);
    if (swiperRef.current) {
      swiperRef.current.slideToLoop(index, 300);
    }
  };

  const initialSlideIndex = COLORS.findIndex(c => c.id === bgColor);

  return (
    <div className="flex flex-col w-full items-center">
      <div className="absolute top-4 inset-x-4 bg-amber-950 h-20 flex justify-center items-center text-white font-bold">
        Step Indicator
      </div>
      <div className="flex flex-col gap-5 w-full items-center">
        <div className="flex flex-col gap-2 w-full text-center pt-10">
          <p>프레임 색상</p>
          <Swiper
            spaceBetween={20}
            slidesPerView={5}
            centeredSlides={true}
            loop
            initialSlide={initialSlideIndex}
            onSwiper={swiper => (swiperRef.current = swiper)}
            slidesOffsetBefore={50}
            className="my-10 w-full"
          >
            {COLORS.map((c, index) => (
              <SwiperSlide key={c.id} className="flex justify-center items-center">
                <div
                  className={`w-15 h-15 bg-white/50 rounded-full border-2 flex justify-center items-center ${bgColor === c.id ? 'border-black' : 'border-transparent'}`}
                >
                  <button
                    className={`w-10 h-10 rounded-full ${c.color}`}
                    onClick={() => handleButtonClick(c.id, index)}
                    id={c.id}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="flex flex-col gap-2 w-full text-center">
          <p>스티커</p>
          <div className="grid grid-flow-col gap-4 overflow-auto">{/*  */}</div>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <p>결과물</p>
          <div>
            <PhotoFrame />
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
