'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useFrameStore } from '@/stores/useFrameStore';
import useSkinStore from '@/stores/useSkinStore';

export default function Header() {
  const pathname = usePathname();

  const resetStores = () => {
    useFrameStore.getState().reset();
    useSkinStore.getState().reset();
  };

  return (
    <ul
      onClick={resetStores}
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
