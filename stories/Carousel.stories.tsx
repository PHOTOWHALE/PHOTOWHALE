import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Carousel from '@/components/common/Carousel';
import { SwiperSlide } from 'swiper/react';
import SwiperType from 'swiper';
import 'swiper/css';
import 'tailwindcss';
// --- 메타데이터 정의 ---
const meta: Meta<typeof Carousel> = {
  title: 'Components/Carousel',
  component: Carousel,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    slidesPerView: {
      control: { type: 'number' },
      description: '한 화면에 보이는 슬라이드 개수',
    },
    centeredSlides: {
      control: { type: 'boolean' },
      description: '현재 슬라이드를 중앙에 배치할지 여부',
    },
    loop: {
      control: { type: 'boolean' },
      description: '무한 루프 사용 여부',
    },
    initialSlide: {
      control: { type: 'number' },
      description: '초기 슬라이드 인덱스',
    },
    children: {
      control: false,
    },
    swiperRef: {
      control: false,
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Carousel>;

// --- 더미 슬라이드 배열 생성 ---
const dummySlides = Array.from({ length: 10 }, (_, i) => (
  <SwiperSlide key={i}>
    <div className="flex items-center justify-center bg-amber-200 text-2xl h-20 w-30 border border-gray-300 rounded-lg mx-auto">
      <p>Slide {i + 1}</p>
    </div>
  </SwiperSlide>
));

// --- 기본 캐러셀 ---
export const Default: Story = {
  args: {
    slidesPerView: 5,
    centeredSlides: true,
    loop: true,
    initialSlide: 0,
    children: dummySlides,
  },
  render: args => (
    <div className="p-5 bg-white">
      <Carousel {...args} />
    </div>
  ),
};

// --- 싱글뷰 캐러셀 ---
export const SingleView: Story = {
  args: {
    ...Default.args,
    slidesPerView: 1,
    centeredSlides: false,
    loop: false,
    children: Array.from({ length: 10 }, (_, i) => (
      <SwiperSlide key={i}>
        <div className="flex items-center justify-center text-2xl h-20 w-full bg-blue-500 border border-gray-300 rounded-lg">
          <p>Slide {i + 1}</p>
        </div>
      </SwiperSlide>
    )),
  },
  render: args => (
    <div className="max-w-4xl mx-auto p-5 bg-white">
      <Carousel {...args} />
    </div>
  ),
};

function ColorFillDemoComponent() {
  const [color, setColor] = useState('bg-gray-200');
  const COLORS = [
    'bg-red-500',
    'bg-orange-500',
    'bg-yellow-400',
    'bg-green-500',
    'bg-blue-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-gray-400',
  ];
  const swiperRef = React.useRef<SwiperType | null>(null);

  const handleButtonClick = (colorId: string, index: number) => {
    setColor(colorId);
    if (swiperRef.current) {
      swiperRef.current.slideToLoop(index, 300);
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 p-8 bg-white">
      <div
        className={`w-60 h-32 rounded-xl border-2 border-gray-400 flex items-center justify-center text-lg font-bold transition-colors duration-300 ${color}`}
      >
        색상 미리보기 영역
      </div>
      <Carousel slidesPerView={5} centeredSlides loop swiperRef={swiperRef}>
        {COLORS.map((c, index) => (
          <SwiperSlide key={c}>
            <button
              className={`w-12 h-12 rounded-full border-2 border-gray-300 m-auto transition-transform hover:scale-110 ${c}`}
              onClick={() => handleButtonClick(c, index)}
              aria-label={c}
            />
          </SwiperSlide>
        ))}
      </Carousel>
    </div>
  );
}

export const ColorFillDemo: Story = {
  render: () => <ColorFillDemoComponent />,
};
