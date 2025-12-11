'use client';

import { Fragment } from 'react';
import { useProgressStore } from '@/stores/useProgressStore';

const steps = [
  { title: '프레임 선택', value: 1 },
  { title: '사진 선택', value: 2 },
  { title: '마무리', value: 3 },
];

export default function StepBar() {
  const currentStep = useProgressStore(state => state.currentStep);

  return (
    <div className="flex items-center w-[70%]">
      {steps.map((step, index) => (
        <Fragment key={step.value}>
          <div className="flex flex-col items-center">
            <div
              className={`
                w-8 h-8 rounded-full border-2 flex items-center justify-center
                ${currentStep >= step.value ? 'bg-blue-600 text-white' : 'border-gray-400 text-gray-500'}
              `}
            >
              {currentStep > step.value ? '✔' : step.value}
            </div>
            <span
              className={`text-xs mt-2 ${
                currentStep >= step.value ? 'text-blue-600 font-semibold' : 'text-gray-500'
              }`}
            >
              {step.title}
            </span>
          </div>

          {/* 연결선 마지막 제외*/}
          {index < steps.length - 1 && (
            <div
              className={`
                flex-1 h-0.5 mx-1.5 mb-6
                ${currentStep > step.value ? 'bg-blue-600' : 'bg-gray-300'}
              `}
            />
          )}
        </Fragment>
      ))}
    </div>
  );
}
