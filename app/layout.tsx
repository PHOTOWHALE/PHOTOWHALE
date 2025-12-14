import type { Metadata } from 'next';
import './globals.css';
import { digitalix, pretendard } from '@/utils/font';
import Header from '@/components/common/Header';

export const metadata: Metadata = {
  title: {
    template: '%s | Time Film',
    default: 'Time Film',
  },
  description: '우리의 추억을 담다.',
};

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
      </body>
    </html>
  );
}
