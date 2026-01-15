import { ChangeEvent, useState } from 'react';
import { convertHeicToJpeg } from '@/utils/convertHeic';
import { Toast } from '@/components/common/Toast';

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('HEIC_CONVERT_TIMEOUT')), ms);
    promise
      .then(resolve)
      .catch(reject)
      .finally(() => clearTimeout(timer));
  });
}

function readAsDataURL(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(reader.result as string);

    reader.onerror = () => {
      const err = reader.error;
      // 모바일에서도 원인 확인 가능
      alert(`FileReader error: ${err?.name ?? 'unknown'} - ${err?.message ?? ''}`);
      reject(new Error('FILEREADER_ERROR'));
    };

    reader.onabort = () => reject(new Error('FILEREADER_ABORT'));

    reader.readAsDataURL(blob);
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

    setIsConverting(true);

    try {
      const convertedFile = await withTimeout(convertHeicToJpeg(file), timeoutMs);

      // ✅ 여기서 FileReader를 await (성공/실패를 try/catch로 정리)
      const dataUrl = await readAsDataURL(convertedFile);

      onSuccess(index, dataUrl);
    } catch (err) {
      if (err instanceof Error && err.message === 'HEIC_CONVERT_TIMEOUT') {
        Toast.error('변환시간이 초과되었습니다.\n다른 사진을 선택해 주세요.');
      } else if (err instanceof Error && err.message === 'FILEREADER_ERROR') {
        Toast.error('이미지 읽기에 실패했습니다.\n다른 사진을 선택해 주세요.');
      } else if (err instanceof Error && err.message === 'FILEREADER_ABORT') {
        Toast.error('이미지 읽기가 중단되었습니다.\n다시 시도해 주세요.');
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
