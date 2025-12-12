'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  return (
    <ul className="flex items-center justify-center h-12 my-4 w-[70%] gap-4 bg-gray-50 font-semibold rounded-full shadow-md">
      <li>
        <Link href="/">Home</Link>
        {pathname === '/' ? '🩶' : ''}
      </li>
      <li>
        <Link href="/frame/view">Make</Link>
        {pathname.includes('/frame') ? '🩶' : ''}
      </li>
      <li>
        <Link href="/contact">Contact</Link>
        {pathname === '/contact' ? '🩶' : ''}
      </li>
      <li>
        <Link href="/notice">Notice</Link>
        {pathname === '/notice' ? '🩶' : ''}
      </li>
      <li>
        <Link href="/report">Report</Link>
        {pathname === '/report' ? '🩶' : ''}
      </li>
    </ul>
  );
}
