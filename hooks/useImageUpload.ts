import { ChangeEvent, useState } from 'react';
import { convertHeicToJpeg } from '@/utils/convertHeic';
import { Toast } from '@/components/common/Toast';

const MAX_FILE_SIZE = 7 * 1024 * 1024; // 7MiB

function withTimeout<T>(promise: Promise<T>, ms: number, timeoutMessage = 'TIMEOUT'): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(timeoutMessage)), ms);
    promise
      .then(resolve)
      .catch(reject)
      .finally(() => clearTimeout(timer));
  });
}

// ✅ 안드로이드 호환 최우선 검증
async function validateImageUrl(url: string, ms = 3000): Promise<void> {
  await withTimeout(
    new Promise<void>((resolve, reject) => {
      const img = new Image();

      img.onload = () => {
        if (img.naturalWidth > 0 && img.naturalHeight > 0) resolve();
        else reject(new Error('IMAGE_DECODE_FAIL'));
      };

      img.onerror = () => reject(new Error('IMAGE_DECODE_FAIL'));
      img.src = url;
    }),
    ms,
    'IMAGE_DECODE_TIMEOUT',
  );
}

interface UseImageUploadOptions {
  onSuccess: (index: number, url: string) => void;
  timeoutMs?: number;
  enabled?: boolean;
}

export function useImageUpload({
  onSuccess,
  timeoutMs = 7000,
  enabled = true,
}: UseImageUploadOptions) {
  const [isConverting, setIsConverting] = useState(false);

  const handleChangeFile = (index: number) => async (e: ChangeEvent<HTMLInputElement>) => {
    if (!enabled) return;

    const input = e.currentTarget;
    const file = input.files?.[0];
    if (!file) return;

    const size = typeof file.size === 'number' ? file.size : 0;
    if (size > 0 && size > MAX_FILE_SIZE) {
      Toast.error('이미지 용량은 7MB 이하만 업로드할 수 있습니다.');
      input.value = '';
      return;
    }

    setIsConverting(true);

    try {
      const convertedFile = await withTimeout(
        convertHeicToJpeg(file),
        timeoutMs,
        'HEIC_CONVERT_TIMEOUT',
      );

      if (!convertedFile || convertedFile.size === 0) {
        throw new Error('EMPTY_BLOB');
      }

      // ✅ type 보정 (안드로이드에서 중요)
      const safeFile =
        convertedFile.type && convertedFile.type.startsWith('image/')
          ? convertedFile
          : new File([convertedFile], 'upload.jpg', { type: 'image/jpeg' });

      const blobUrl = URL.createObjectURL(safeFile);

      try {
        await validateImageUrl(blobUrl, 3000);
      } catch (e) {
        URL.revokeObjectURL(blobUrl);
        throw e;
      }

      onSuccess(index, blobUrl);
    } catch (err) {
      if (err instanceof Error && err.message === 'IMAGE_DECODE_FAIL') {
        Toast.error('이미지를 읽을 수 없는 파일입니다.\n다른 사진을 선택해 주세요.');
      } else if (err instanceof Error && err.message === 'IMAGE_DECODE_TIMEOUT') {
        Toast.error('이미지 처리 시간이 길어졌습니다.\n다른 사진으로 시도해 주세요.');
      } else if (err instanceof Error && err.message === 'EMPTY_BLOB') {
        Toast.error('이미지 변환 결과가 비어있습니다.\n다른 사진을 선택해 주세요.');
      } else if (err instanceof Error && err.message === 'HEIC_CONVERT_TIMEOUT') {
        Toast.error('변환시간이 초과되었습니다.\n다른 사진을 선택해 주세요.');
      } else {
        console.error(err);
        Toast.error('사진 변환에 실패했습니다.');
      }
    } finally {
      setIsConverting(false);
      input.value = '';
    }
  };

  return { isConverting, handleChangeFile };
}
