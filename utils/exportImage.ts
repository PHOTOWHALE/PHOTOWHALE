import { toPngSafe } from '@/utils/htmlToImageSafe';
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
  // 항상 iOS-safe PNG 생성
  const dataUrl = await toPngSafe(node, pixelRatio);

  // 공유용 (Blob)
  if (returnBlob) {
    const res = await fetch(dataUrl);
    const blob = await res.blob();
    return blob;
  }

  // 다운로드
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  link.click();

  return dataUrl;
}
