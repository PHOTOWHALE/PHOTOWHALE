import type { Metadata } from 'next';
import './globals.css';
import { digitalix } from '@/utils/font';
import Header from '@/components/common/Header';
import { GoogleAnalytics } from '@next/third-parties/google';
import ToastProvider from '@/components/common/Toast';

export const metadata: Metadata = {
  title: {
    template: '%s | PHOTOWHALE',
    default: 'PHOTOWHALE',
  },
  description: '우리의 추억을 담다.',
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={` ${digitalix.variable} antialiased app-container`}>
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
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
