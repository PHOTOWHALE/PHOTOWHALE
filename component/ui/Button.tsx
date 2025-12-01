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
      ? 'bg-rose-400 text-white hover:bg-rose-500'
      : 'border border-rose-400 text-rose-400 hover:bg-rose-50';

  const widthClass = full ? 'w-full' : '';

  return (
    <button
      className={[base, variantClass, widthClass, className].filter(Boolean).join(' ')}
      {...props}
    />
  );
};

export default Button;
