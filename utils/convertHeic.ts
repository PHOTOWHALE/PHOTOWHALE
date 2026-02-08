export async function convertHeic(file: File): Promise<File> {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/convert', {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      const blob = await res.blob();
      return new File([blob], file.name.replace(/\.heic$/i, '.jpg'), {
        type: 'image/jpeg',
      });
    }
  } catch (e) {
    console.error('sharp 변환 실패:', e);
  }

  // fallback 라이브러리 실행 (heic2any)
  const heic2any = (await import('heic2any')).default;
  const blob = await heic2any({
    blob: file,
    toType: 'image/jpeg',
    quality: 0.9,
  });

  return new File([blob as Blob], file.name.replace(/\.heic$/i, '.jpg'), {
    type: 'image/jpeg',
  });
}
