// libheif-js 모듈 캐싱 (싱글톤)
let libheifModule: typeof import('libheif-js/wasm-bundle') | null = null;
let isInitializing = false;
let initPromise: Promise<typeof import('libheif-js/wasm-bundle')> | null = null;

// libheif-js 초기화 및 캐싱
async function ensureLibheifLoaded() {
  if (libheifModule) {
    return libheifModule;
  }

  // 이미 초기화 중이면 같은 Promise 반환
  if (isInitializing && initPromise) {
    return initPromise;
  }

  isInitializing = true;
  initPromise = (async () => {
    const libheifWasm = await import('libheif-js/wasm-bundle');
    // WASM 초기화 대기 (모바일 안정성)
    await new Promise(resolve => setTimeout(resolve, 100));
    libheifModule = libheifWasm;
    return libheifWasm;
  })();

  try {
    return await initPromise;
  } finally {
    isInitializing = false;
    initPromise = null;
  }
}

export async function convertHeic(file: File): Promise<File> {
  // Heic 파일이 아니면 원본 반환
  if (file.type !== 'image/heic' && !file.name.toLowerCase().endsWith('.heic')) {
    return file;
  }

  console.time('HEIC 변환 총 소요시간');

  try {
    // libheif-js 초기화 (첫 호출 시에만 로딩, 이후 캐시 사용)
    const libheif = await ensureLibheifLoaded();

    const arrayBuffer = await file.arrayBuffer();

    // 메모리 확보를 위한 짧은 대기 (모바일 안정성)
    await new Promise(resolve => setTimeout(resolve, 50));

    const decoder = new libheif.HeifDecoder();
    const data = decoder.decode(arrayBuffer);

    if (!data || data.length === 0) {
      throw new Error('HEIC 디코딩 실패');
    }

    const image = data[0];
    const width = image.get_width();
    const height = image.get_height();

    // ImageData 얻기 - display는 비동기 콜백으로 결과를 반환
    const displayData = await new Promise<{
      data: Uint8ClampedArray;
      width: number;
      height: number;
    }>((resolve, reject) => {
      const target = {
        data: new Uint8ClampedArray(width * height * 4),
        width,
        height,
      };

      try {
        image.display(
          target,
          (result: { data: Uint8ClampedArray; width: number; height: number } | null) => {
            if (!result) {
              return reject(new Error('HEIC display 실패'));
            }
            resolve(result);
          },
        );
      } catch (err) {
        reject(err);
      }
    });

    const imageData = new ImageData(
      new Uint8ClampedArray(displayData.data),
      displayData.width,
      displayData.height,
    );

    const canvas = document.createElement('canvas');
    canvas.width = displayData.width;
    canvas.height = displayData.height;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Canvas context failed');
    }

    ctx.putImageData(imageData, 0, 0);

    // 리사이징 및 JPEG 변환
    const resizedBlob = await resizeImageFromCanvas(canvas, 1600);

    return new File([resizedBlob], file.name.replace(/\.heic$/i, '.jpg'), {
      type: 'image/jpeg',
    });
  } catch (error) {
    console.error('HEIC 변환 중 오류:', error);
    throw new Error('HEIC 파일을 처리할 수 없습니다. 다시 시도해 주세요.');
  } finally {
    console.timeEnd('HEIC 변환 총 소요시간');
  }
}

// Canvas를 리사이징하여 Blob 반환
async function resizeImageFromCanvas(
  sourceCanvas: HTMLCanvasElement,
  maxSize: number,
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    let width = sourceCanvas.width;
    let height = sourceCanvas.height;

    // 큰 이미지만 리사이징
    if (width > maxSize || height > maxSize) {
      if (width > height) {
        height = (height / width) * maxSize;
        width = maxSize;
      } else {
        width = (width / height) * maxSize;
        height = maxSize;
      }
    }

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      reject(new Error('Canvas context failed'));
      return;
    }

    ctx.drawImage(sourceCanvas, 0, 0, width, height);

    canvas.toBlob(
      resultBlob => {
        if (resultBlob) {
          resolve(resultBlob);
        } else {
          reject(new Error('Canvas to Blob failed'));
        }
      },
      'image/jpeg',
      0.85,
    );
  });
}
