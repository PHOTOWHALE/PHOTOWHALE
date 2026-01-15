import { toBlob } from 'html-to-image';
import { getCurrentTime } from '@/utils/time';

interface ExportPngOptions {
  filename?: string;
  pixelRatio?: number;
  returnBlob?: boolean;
}

const isIOS = typeof navigator !== 'undefined' && /iP(hone|ad|od)/i.test(navigator.userAgent);

async function waitForImages(node: HTMLElement) {
  const imgs = Array.from(node.querySelectorAll('img'));
  await Promise.all(
    imgs.map(img => {
      if (img.complete && img.naturalWidth > 0) return Promise.resolve();
      return new Promise<void>(resolve => {
        const done = () => resolve();
        img.addEventListener('load', done, { once: true });
        img.addEventListener('error', done, { once: true }); // 에러여도 진행(원하면 reject로 변경 가능)
      });
    }),
  );
}

async function buildBlob(
  element: HTMLElement,
  pixelRatio: number,
  maxAttempts = 5,
  stableThreshold = 3,
) {
  let largestBlob: Blob | null = null;
  let largestSize = 0;
  let stableCount = 0;
  let lastSize = 0;

  // 총 5번 반복, 3번 연속 크기 변화 없으면 조기 종료
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    if (attempt > 0) {
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    const blob = await toBlob(element, {
      cacheBust: false,
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
  await waitForImages(node);
  // ios 환경 분기
  const blob = isIOS
    ? await buildBlob(node, pixelRatio)
    : await toBlob(node, {
        cacheBust: false,
        pixelRatio,
      });

  if (!blob) {
    throw new Error('이미지 생성 실패');
  }

  // 공유하기면 blob 그대로 반환
  if (returnBlob) {
    return blob;
  }

  // 저장하기: blob 객체 -> url로 변환
  const blobUrl = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.download = filename;
  link.href = blobUrl;
  link.click();

  // 메모리 정리
  setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);

  return blobUrl;
}
