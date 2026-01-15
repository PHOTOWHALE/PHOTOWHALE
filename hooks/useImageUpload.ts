import { ChangeEvent, useState } from 'react';
import { convertHeicToJpeg } from '@/utils/convertHeic';
import { Toast } from '@/components/common/Toast';

const MAX_FILE_SIZE = 7 * 1024 * 1024; // 7MiB

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('HEIC_CONVERT_TIMEOUT')), ms);
    promise
      .then(resolve)
      .catch(reject)
      .finally(() => clearTimeout(timer));
  });
}

function readAsDataURL(file: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('FILEREADER_ERROR'));
    reader.onabort = () => reject(new Error('FILEREADER_ABORT'));

    reader.readAsDataURL(file);
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

    const input = e.currentTarget; // ✅ e.target 대신
    const file = input.files?.[0];
    if (!file) return;

    // ✅ size가 0/비정상일 수 있는 케이스 대비(안드로이드/클라우드 선택 등)
    const size = typeof file.size === 'number' ? file.size : 0;

    if (size > 0 && size > MAX_FILE_SIZE) {
      Toast.error('이미지 용량은 7MB 이하만 업로드할 수 있습니다.');
      input.value = '';
      return;
    }

    setIsConverting(true);

    try {
      const convertedFile = await withTimeout(convertHeicToJpeg(file), timeoutMs);
      const dataUrl = await readAsDataURL(convertedFile);
      onSuccess(index, dataUrl);
    } catch (err) {
      if (err instanceof Error && err.message === 'HEIC_CONVERT_TIMEOUT') {
        Toast.error('변환시간이 초과되었습니다.\n다른 사진을 선택해 주세요.');
      } else if (
        err instanceof Error &&
        (err.message === 'FILEREADER_ERROR' || err.message === 'FILEREADER_ABORT')
      ) {
        Toast.error('이미지 읽기에 실패했습니다.\n다른 앱(갤러리)에서 다시 선택해 주세요.');
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
