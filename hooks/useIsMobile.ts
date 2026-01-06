'use client';

import { useState } from 'react';

export function useIsMobile() {
  const [isMobile] = useState(() => {
    if (typeof navigator === 'undefined') return false;

    return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  });

  return isMobile;
}
