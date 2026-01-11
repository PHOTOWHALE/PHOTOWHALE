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

  //  이미지가 완전히 로드될 때까지 대기
  await waitForImages(node);

  //  그 다음 SVG 변환
  const svgDataUrl = await toSvg(node, {
    cacheBust: true,
  });

  const img = await createImage(svgDataUrl);

  const canvas = document.createElement('canvas');
  canvas.width = width * pixelRatio;
  canvas.height = height * pixelRatio;

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('canvas context 생성 실패');

  let rendered = false;

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    if (canvas.toDataURL('image/png').length > 200_000) {
      rendered = true;
    }

    if (!rendered) {
      requestAnimationFrame(draw);
    }
  };

  draw();

  await new Promise(res => setTimeout(res, 500));

  return canvas.toDataURL('image/png');
}

export async function waitForImages(node: HTMLElement) {
  const images = Array.from(node.querySelectorAll('img'));

  await Promise.all(
    images.map(img => {
      // 이미 로드 완료된 경우
      if (img.complete && img.naturalWidth > 0) {
        return Promise.resolve();
      }

      // 아직 로딩 중인 경우
      return new Promise<void>(resolve => {
        const onDone = () => {
          img.removeEventListener('load', onDone);
          img.removeEventListener('error', onDone);
          resolve();
        };

        img.addEventListener('load', onDone);
        img.addEventListener('error', onDone);
      });
    }),
  );
}
