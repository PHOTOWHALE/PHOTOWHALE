import { toSvg } from 'html-to-image';

function createImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      // iOS Safari에서 decode 보장
      if ('decode' in img) {
        img
          .decode()
          .then(() => resolve(img))
          .catch(() => resolve(img));
      } else {
        setTimeout(() => resolve(img), 200);
      }
    };

    img.onerror = reject;
    img.src = src;
  });
}

/** iOS-safe PNG 생성 */
export async function toPngSafe(node: HTMLElement, pixelRatio = 2): Promise<string> {
  const width = node.offsetWidth;
  const height = node.offsetHeight;

  // 1) DOM → SVG
  const svgDataUrl = await toSvg(node, {
    cacheBust: true,
    pixelRatio,
  });

  // 2) SVG → Image
  const img = await createImage(svgDataUrl);

  // 3) Canvas 직접 생성
  const canvas = document.createElement('canvas');
  canvas.width = width * pixelRatio;
  canvas.height = height * pixelRatio;

  const ctx = canvas.getContext('2d', { alpha: false });
  if (!ctx) throw new Error('Canvas context 생성 실패');

  ctx.scale(pixelRatio, pixelRatio);
  ctx.drawImage(img, 0, 0, width, height);

  // 4) PNG 추출
  return canvas.toDataURL('image/png');
}
