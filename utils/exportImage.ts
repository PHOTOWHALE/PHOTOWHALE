import { toPng } from 'html-to-image';
import { getCurrentTime } from '@/utils/time';

interface ExportPngOptions {
  filename?: string;
  pixelRatio?: number;
}

export async function exportImage(
  node: HTMLElement,
  { filename = `PHOTOWHALE_${getCurrentTime()}.png`, pixelRatio = 2 }: ExportPngOptions = {},
) {
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
