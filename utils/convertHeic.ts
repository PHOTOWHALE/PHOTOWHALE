export async function convertHeic(file: File): Promise<File> {
  // Heic 파일이 아니면 원본 반환
  if (file.type !== 'image/heic' && !file.name.toLowerCase().endsWith('.heic')) {
    return file;
  }

  try {
    // 1. HEIC -> JPEG 변환
    const heic2any = (await import('heic2any')).default;
    const jpegBlob = await heic2any({
      blob: file,
      toType: 'image/jpeg',
      quality: 0.8,
    });

    // 2. 브라우저 Canvas 리사이징
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = URL.createObjectURL(jpegBlob as Blob);

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 1600;
        const scale = Math.min(MAX_WIDTH / img.width, 1);

        canvas.width = img.width * scale;
        canvas.height = img.height * scale;

        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(
          finalBlob => {
            URL.revokeObjectURL(img.src);
            if (finalBlob) {
              resolve(
                new File([finalBlob], file.name.replace(/\.heic$/i, '.jpg'), {
                  type: 'image/jpeg',
                }),
              );
            } else {
              reject(new Error('Canvas to Blob failed'));
            }
          },
          'image/jpeg',
          0.8,
        );
      };

      img.onerror = () => {
        URL.revokeObjectURL(img.src);
        reject(new Error('Image load failed'));
      };
    });
  } catch (error) {
    console.error('HEIC 변환 중 오류:', error);
    throw new Error('HEIC 파일을 처리할 수 없습니다. 다시 시도해 주세요.');
  }
}
