'use client';

import { ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  full?: boolean;
}

const Button = ({ variant = 'primary', full = false, className, ...props }: ButtonProps) => {
  const base =
    'inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors';

  const variantClass =
    variant === 'primary'
      ? 'bg-[#579fe2] text-white hover:bg-[#007ACC]'
      : 'border border-[#579fe2] text-[#579fe2] hover:bg-[#E0F2FF]';

  const widthClass = full ? 'w-full' : '';

  return (
    <button
      className={[base, variantClass, widthClass, className].filter(Boolean).join(' ')}
      {...props}
    />
  );
};

export default Button;
