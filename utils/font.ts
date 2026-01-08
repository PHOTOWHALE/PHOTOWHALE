import localFont from 'next/font/local';

export const digitalix = localFont({
  src: '../public/fonts/digitalix.ttf',
  variable: '--font-digitalix',
  display: 'swap',
  preload: false,
  fallback: ['system-ui', 'sans-serif'],
});
