import { ChangeEvent, useState } from 'react';
import { convertHeicToJpeg } from '@/utils/convertHeic';
import { Toast } from '@/components/common/Toast';

const MAX_FILE_SIZE = 7 * 1000 * 1000;

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error('HEIC_CONVERT_TIMEOUT'));
    }, ms);

    promise
      .then(resolve)
      .catch(reject)
      .finally(() => clearTimeout(timer));
  });
}

interface UseImageUploadOptions {
  onSuccess: (index: number, dataUrl: string) => void;
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

    if (file.size > 0 && file.size > MAX_FILE_SIZE) {
      Toast.error('이미지 용량은 7MB 이하만 업로드할 수 있습니다.');
      input.value = '';
      return;
    }

    setIsConverting(true);

    try {
      const convertedFile = await withTimeout(convertHeicToJpeg(file), timeoutMs);

      if (convertedFile.size > MAX_FILE_SIZE) {
        Toast.error('변환된 이미지 용량이 7MB를 초과합니다.\n다른 사진을 선택해 주세요.');
        input.value = '';
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        onSuccess(index, reader.result as string);
      };
      reader.onerror = () => {
        Toast.error('이미지 읽기에 실패했습니다.\n다른 사진을 선택해 주세요.');
      };
      reader.readAsDataURL(convertedFile);
    } catch (err) {
      if (err instanceof Error && err.message === 'HEIC_CONVERT_TIMEOUT') {
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

  return {
    isConverting,
    handleChangeFile,
  };
}
