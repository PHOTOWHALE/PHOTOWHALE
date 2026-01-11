import { toBlob, toPng } from 'html-to-image';
import { getCurrentTime } from '@/utils/time';

interface ExportPngOptions {
  filename?: string;
  pixelRatio?: number;
  returnBlob?: boolean;
}

const isIOS = typeof navigator !== 'undefined' && /iP(hone|ad|od)/i.test(navigator.userAgent);

async function buildBlobWithRetry(
  element: HTMLElement,
  pixelRatio: number,
  maxAttempts = 5,
  stableThreshold = 3,
) {
  let largestBlob: Blob | null = null;
  let largestSize = 0;
  let stableCount = 0;
  let lastSize = 0;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    if (attempt > 0) {
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    const blob = await toBlob(element, {
      cacheBust: true,
      pixelRatio,
    });

    if (blob) {
      if (blob.size > largestSize) {
        largestBlob = blob;
        largestSize = blob.size;
        stableCount = 0;
      } else if (blob.size === lastSize) {
        stableCount++;
        if (stableCount >= stableThreshold) {
          break;
        }
      }

      lastSize = blob.size;
    }
  }

  return largestBlob;
}

export async function exportImage(
  node: HTMLElement,
  {
    filename = `PHOTOWHALE_${getCurrentTime()}.png`,
    pixelRatio = 2,
    returnBlob = false,
  }: ExportPngOptions = {},
) {
  if (returnBlob) {
    const blob = isIOS
      ? await buildBlobWithRetry(node, pixelRatio)
      : await toBlob(node, {
          cacheBust: true,
          pixelRatio,
        });

    if (!blob) {
      throw new Error('이미지 Blob 생성 실패');
    }

    return blob;
  }

  let dataUrl = '';

  if (isIOS) {
    const blob = await buildBlobWithRetry(node, pixelRatio);

    if (!blob) {
      throw new Error('이미지 Blob 생성 실패');
    }

    dataUrl = URL.createObjectURL(blob);
  } else {
    dataUrl = await toPng(node, {
      cacheBust: true,
      pixelRatio,
    });
  }

  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  link.click();

  // iOS blob URL 메모리 정리
  if (isIOS) {
    setTimeout(() => URL.revokeObjectURL(dataUrl), 100);
  }

  return dataUrl;
}
