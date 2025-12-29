'use client';
import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function GAPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!GA_ID || !window.gtag) return;

    const pagePath = searchParams?.toString() ? `${pathname}?${searchParams.toString()}` : pathname;

    window.gtag('config', GA_ID, {
      page_path: pagePath,
    });
  }, [pathname, searchParams]);

  return null;
}
