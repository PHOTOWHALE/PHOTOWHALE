import localFont from 'next/font/local';

export const pretendard = localFont({
  src: '../public/fonts/PretendardVariable.woff2',
  variable: '--font-pretendard',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
});
