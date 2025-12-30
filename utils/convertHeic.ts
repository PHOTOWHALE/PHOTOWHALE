import heic2any from 'heic2any';

export async function convertHeicToJpeg(file: File): Promise<File> {
  if (file.type !== 'image/heic' && !file.name.toLowerCase().endsWith('.heic')) {
    return file;
  }

  const blob = await heic2any({
    blob: file,
    toType: 'image/jpeg',
    quality: 0.9,
  });

  return new File([blob as Blob], file.name.replace(/\.heic$/i, '.jpg'), { type: 'image/jpeg' });
}
