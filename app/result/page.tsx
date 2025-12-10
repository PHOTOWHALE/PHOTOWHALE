'use client';

import PhotoFrame from '@/components/common/PhotoFrame';
import { useFrameStore } from '@/stores/useFrameStore';
import { COLORS } from '@/types/colors';
import { useRef } from 'react';
import SwiperType from 'swiper';
import 'swiper/css';
import Carousel from '@/components/common/Carousel';
import { SwiperSlide } from 'swiper/react';
import useStickerStore from '@/stores/useStickerStore';
import { STICKERS } from '@/types/stickers';

export default function Result() {
  const swiperRef = useRef<SwiperType | null>(null);
  const stickerSwiperRef = useRef<SwiperType | null>(null);

  const bgColor = useFrameStore(s => s.color);
  const setbgColor = useFrameStore(s => s.setColor);
  const layout = useFrameStore(s => s.layout);
  const stickers = STICKERS[layout];

  const selectedSticker = useStickerStore(s => s.selectedSticker);
  const setSelectedSticker = useStickerStore(s => s.setSelectedSticker);

  const handleColorButtonClick = (colorId: string, index: number) => {
    setbgColor(colorId);
    if (swiperRef.current) {
      swiperRef.current.slideToLoop(index, 300);
    }
  };

  const handleStickerButtonClick = (stickerId: string, index: number) => {
    setSelectedSticker(stickerId);
    if (stickerSwiperRef.current) {
      stickerSwiperRef.current.slideToLoop(index, 300);
    }
  };

  const initialColorSlide = COLORS.findIndex(c => c.id === bgColor);
  const initialStickerSlide = COLORS.findIndex(c => c.id === selectedSticker);

  return (
    <div className="flex flex-col w-full items-center">
      <div className="absolute top-4 inset-x-4 bg-amber-950 h-20 flex justify-center items-center text-white font-bold">
        Step Indicator
      </div>
      <div className="flex flex-col gap-5 w-full items-center">
        <div className="flex flex-col gap-2 w-[70%] text-center pt-10">
          <p>프레임 색상</p>
          <Carousel swiperRef={swiperRef} initialSlide={initialColorSlide}>
            {COLORS.map((c, index) => (
              <SwiperSlide key={c.id}>
                <div className="flex justify-center items-center">
                  <div
                    className={`w-12 h-12 bg-white/50 rounded-full border-2 flex justify-center items-center ${bgColor === c.id ? 'border-black' : 'border-transparent'}`}
                  >
                    <button
                      className={`w-8 h-8 rounded-full ${c.color}`}
                      onClick={() => handleColorButtonClick(c.id, index)}
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Carousel>
        </div>
        <div className="flex flex-col gap-2 w-[70%] text-center">
          <p>스티커</p>
          <Carousel swiperRef={stickerSwiperRef} initialSlide={initialStickerSlide}>
            {stickers.map((s, index) => (
              <SwiperSlide key={s.id}>
                <div className="flex justify-center items-center">
                  <div
                    className={`w-12 h-12 bg-white/50 rounded-full border-2 flex justify-center items-center ${selectedSticker === s.id ? 'border-black' : 'border-transparent'}`}
                  >
                    <button
                      className={`w-8 h-8 rounded-full`}
                      onClick={() => handleStickerButtonClick(s.id, index)}
                    >
                      {s.id}
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
