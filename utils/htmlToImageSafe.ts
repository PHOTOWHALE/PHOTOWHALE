import { toSvg } from 'html-to-image';

async function createImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      // iOS decode 보장
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

  // DOM → SVG
  const svgDataUrl = await toSvg(node, {
    cacheBust: true,
  });

  // SVG → Image
  const img = await createImage(svgDataUrl);

  // Canvas 직접 생성
  const canvas = document.createElement('canvas');
  canvas.width = width * pixelRatio;
  canvas.height = height * pixelRatio;

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('canvas context 생성 실패');

  // iOS 렌더 안정화 (여러 프레임 대기)
  let rendered = false;

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    // 검정 캔버스 회피용 검증
    if (canvas.toDataURL('image/png').length > 200_000) {
      rendered = true;
    }

    if (!rendered) {
      requestAnimationFrame(draw);
    }
  };

  draw();

  // 한 박자 더 기다린 뒤 확정
  await new Promise(res => setTimeout(res, 500));

  return canvas.toDataURL('image/png');
}
