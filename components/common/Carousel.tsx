'use client';

import { Swiper } from 'swiper/react';
import SwiperType from 'swiper';

interface CarouselProps {
  children: React.ReactNode;
  slidesPerView?: number;
  centeredSlides?: boolean;
  initialSlide?: number;
  loop?: boolean;
  swiperRef?: React.RefObject<SwiperType | null>;
}

export default function Carousel({
  children,
  slidesPerView = 5,
  centeredSlides = true,
  initialSlide = 0,
  loop = true,
  swiperRef,
}: CarouselProps) {
  return (
    <Swiper
      slidesPerView={slidesPerView}
      centeredSlides={centeredSlides}
      loop={loop}
      initialSlide={initialSlide}
      onSwiper={swiper => {
        if (swiperRef) {
          swiperRef.current = swiper;
        }
      }}
      className="my-10 w-full"
    >
      {children}
    </Swiper>
  );
}
