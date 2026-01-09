'use client';

import { useState } from 'react';
import { useIsMobile } from './useIsMobile';

export function useCanShare() {
  const isMobile = useIsMobile();

  const [canShare] = useState(() => {
    if (typeof navigator === 'undefined') return false;

    const hasWebShare = typeof navigator.share === 'function';

    return isMobile && hasWebShare;
  });

  return canShare;
}
