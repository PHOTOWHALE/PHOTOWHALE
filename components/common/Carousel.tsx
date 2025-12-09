'use client';

import { Swiper } from 'swiper/react';
import SwiperType from 'swiper';
import { COLORS } from '@/types/colors';
import { useFrameStore } from '@/stores/useFrameStore';

interface CarouselProps {
  children: React.ReactNode;
  slidesPerView?: number;
  centeredSlides?: boolean;
  loop?: boolean;
  swiperRef: React.RefObject<SwiperType | null>;
}

export default function Carousel({
  children,
  slidesPerView = 5,
  centeredSlides = true,
  loop = true,
  swiperRef,
}: CarouselProps) {
  const bgColor = useFrameStore(s => s.color);
  const initialSlide = COLORS.findIndex(c => c.id === bgColor);

  return (
    <Swiper
      slidesPerView={slidesPerView}
      centeredSlides={centeredSlides}
      loop={loop}
      initialSlide={initialSlide}
      onSwiper={swiper => (swiperRef.current = swiper)}
      className="my-10 w-full"
    >
      {children}
    </Swiper>
  );
}
