import localFont from 'next/font/local';

export const pretendard = localFont({
  src: [
    { path: '../public/fonts/Pretendard-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/Pretendard-SemiBold.woff2', weight: '600', style: 'normal' },
  ],
  variable: '--font-pretendard',
  display: 'swap',
  preload: true,
});

export const digitalix = localFont({
  src: '../public/fonts/digitalix.ttf',
  variable: '--font-digitalix',
  display: 'swap',
  preload: false,
  fallback: ['system-ui', 'sans-serif'],
});
