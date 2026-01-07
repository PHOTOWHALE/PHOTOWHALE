import { toBlob, toPng } from 'html-to-image';
import { getCurrentTime } from '@/utils/time';

interface ExportPngOptions {
  filename?: string;
  pixelRatio?: number;
  returnBlob?: boolean;
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

  const dataUrl = await toPng(node, {
    cacheBust: true,
    pixelRatio,
  });

  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  link.click();

  return dataUrl;
}
