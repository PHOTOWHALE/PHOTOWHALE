import { toPng } from 'html-to-image';

interface ExportPngOptions {
  filename?: string;
  pixelRatio?: number;
}

export async function exportImage(
  node: HTMLElement,
  { filename = `time-film-${Date.now()}.png`, pixelRatio = 2 }: ExportPngOptions = {},
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
