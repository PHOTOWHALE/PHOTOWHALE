'use client';

import { Swiper } from 'swiper/react';
import SwiperType from 'swiper';

interface CarouselProps {
  children: React.ReactNode;
  slidesPerView?: number;
  slidesPerViewMobile?: number;
  centeredSlides?: boolean;
  initialSlide?: number;
  loop?: boolean;
  swiperRef?: React.RefObject<SwiperType | null>;
}

export default function Carousel({
  children,
  slidesPerView = 7,
  slidesPerViewMobile = 5,
  centeredSlides = true,
  initialSlide = 0,
  loop = true,
  swiperRef,
}: CarouselProps) {
  return (
    <Swiper
      slidesPerView={slidesPerViewMobile}
      centeredSlides={centeredSlides}
      loop={loop}
      initialSlide={initialSlide}
      onSwiper={swiper => {
        if (swiperRef) {
          swiperRef.current = swiper;
        }
      }}
      breakpoints={{
        768: { slidesPerView },
      }}
      className="my-2 w-full"
    >
      {children}
    </Swiper>
  );
}
