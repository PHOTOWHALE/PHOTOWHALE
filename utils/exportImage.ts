import { toPngSafe } from './exportImageIosSafe';
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
  const dataUrl = await toPngSafe(node, pixelRatio);

  if (returnBlob) {
    const res = await fetch(dataUrl);
    return await res.blob();
  }

  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  link.click();

  return dataUrl;
}
