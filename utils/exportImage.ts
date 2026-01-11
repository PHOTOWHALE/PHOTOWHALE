import { toBlob, toPng } from 'html-to-image';
import { getCurrentTime } from '@/utils/time';

interface ExportPngOptions {
  filename?: string;
  pixelRatio?: number;
  returnBlob?: boolean;
}

async function buildPng(node: HTMLElement, pixelRatio: number) {
  const isIOS = /iP(hone|ad|od)/i.test(navigator.userAgent);

  // iOS 아니면 한 번만
  if (!isIOS) {
    return toPng(node, {
      cacheBust: true,
      pixelRatio,
    });
  }

  const maxAttempts = 3;
  let dataUrl = '';

  for (let i = 0; i < maxAttempts; i++) {
    if (i > 0) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    dataUrl = await toPng(node, {
      cacheBust: true,
      pixelRatio,
    });
  }

  if (!dataUrl) {
    throw new Error('이미지 데이터 URL 생성 실패');
  }

  return dataUrl;
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
    const blob = await toBlob(node, {
      cacheBust: true,
      pixelRatio,
    });

    if (!blob) {
      throw new Error('이미지 Blob 생성 실패');
    }

    return blob;
  }

  const dataUrl = await buildPng(node, pixelRatio);

  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  link.click();

  return dataUrl;
}
