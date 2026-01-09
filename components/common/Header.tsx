'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import resetFrameStores from '@/utils/resetFrameStores';

export default function Header() {
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent<HTMLUListElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest('li')) {
      resetFrameStores();
    }
  };

  return (
    <ul
      onClick={handleClick}
      className="flex items-center justify-around h-12 my-4 px-4 w-[70%] gap-4 bg-[#FFFDF8] font-semibold rounded-full shadow-sm text-sm z-20"
    >
      <li>
        <Link href="/" className={`${pathname === '/' ? 'text-[#579fe2]' : ''}`}>
          Home
        </Link>
      </li>
      <li>
        <Link
          href="/frame/select"
          className={`${pathname.includes('/frame') ? 'text-[#579fe2]' : ''}`}
        >
          Make
        </Link>
      </li>
      <li>
        <Link href="/contact" className={`${pathname === '/contact' ? 'text-[#579fe2]' : ''}`}>
          Contact
        </Link>
      </li>
      <li>
        <Link href="/about" className={`${pathname === '/about' ? 'text-[#579fe2]' : ''}`}>
          About
        </Link>
      </li>
    </ul>
  );
}
