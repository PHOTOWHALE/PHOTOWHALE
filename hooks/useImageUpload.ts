import { ChangeEvent, useState } from 'react';
import { convertHeicToJpeg } from '@/utils/convertHeic';
import { Toast } from '@/components/common/Toast';

const MAX_FILE_SIZE = 7 * 1024 * 1024; // 7MB

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

    const input = e.target;
    const file = input.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      Toast.error('이미지 용량은 5MB 이하만 업로드할 수 있습니다.');
      input.value = ''; // 동일 파일 재선택 가능
      return;
    }

    setIsConverting(true);

    try {
      const convertedFile = await withTimeout(convertHeicToJpeg(file), timeoutMs);

      const reader = new FileReader();
      reader.onload = () => {
        onSuccess(index, reader.result as string);
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
