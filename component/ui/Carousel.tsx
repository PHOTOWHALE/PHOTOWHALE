'use client';

import { Swiper } from 'swiper/react';
import SwiperType from 'swiper';

interface CarouselProps {
  children: React.ReactNode;
  spaceBetween?: number;
  slidesPerView?: number;
  centeredSlides?: boolean;
  loop?: boolean;
  initialSlide?: number;
  swiperRef: React.RefObject<SwiperType | null>;
}

export default function Carousel({
  children,
  spaceBetween = 20,
  slidesPerView = 5,
  centeredSlides = true,
  loop = true,
  initialSlide,
  swiperRef,
}: CarouselProps) {
  return (
    <Swiper
      spaceBetween={spaceBetween}
      slidesPerView={slidesPerView}
      centeredSlides={centeredSlides}
      loop={loop}
      initialSlide={initialSlide}
      onSwiper={swiper => (swiperRef.current = swiper)}
      slidesOffsetBefore={50}
      className="my-10 w-full"
    >
      {children}
    </Swiper>
  );
}
