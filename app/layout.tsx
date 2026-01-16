import type { Metadata } from 'next';
import './globals.css';
import { digitalix, pretendard } from '@/utils/font';
import Header from '@/components/common/Header';
import { GoogleAnalytics } from '@next/third-parties/google';
import ToastProvider from '@/components/common/Toast';

export const metadata: Metadata = {
  title: {
    template: '%s | PHOTOWHALE',
    default: 'PHOTOWHALE',
  },
  description: '당신의 소중한 순간들을 프레임에 담아보세요.',
  openGraph: {
    type: 'website',
    title: 'PHOTOWHALE',
    description: '당신의 소중한 순간들을 프레임에 담아보세요.',
    url: 'https://photowhale.vercel.app',
    siteName: 'PHOTOWHALE',
    images: [
      {
        url: '/images/landing/RollingImages1.png',
        width: 1200,
        height: 630,
        alt: 'PHOTOWHALE 썸네일 이미지',
      },
    ],
  },
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${pretendard.variable} ${digitalix.variable} antialiased app-container`}
    >
      <body className="app-wrapper">
        <div className="w-full flex justify-center items-center">
          <Header />
        </div>
        <div className="flex-1 flex flex-col w-full items-center justify-center">{children}</div>
        <ToastProvider />
        {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
      </body>
    </html>
  );
}
