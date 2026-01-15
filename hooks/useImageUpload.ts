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

    /**
     * 1️⃣ 안드로이드 안정화: 실제로 이미지가 로드 가능한지 먼저 검증
     */
    const testUrl = URL.createObjectURL(file);
    const img = new Image();
    img.src = testUrl;

    try {
      await img.decode();
    } catch {
      Toast.error('이미지를 불러올 수 없습니다.');
      URL.revokeObjectURL(testUrl);
      return;
    }

    URL.revokeObjectURL(testUrl);

    /**
     * 2️⃣ 용량 제한 (decode 통과 후 체크)
     */
    if (file.size > MAX_FILE_SIZE) {
      Toast.error('이미지 용량은 7MB 이하만 업로드할 수 있습니다.');
      return;
    }

    setIsConverting(true);

    try {
      /**
       * 3️⃣ HEIC → JPEG 변환 (timeout 보호)
       *    HEIC가 아니면 convert 함수 내부에서 그대로 반환되는 구조 전제
       */
      const convertedFile = await withTimeout(convertHeicToJpeg(file), timeoutMs);

      const reader = new FileReader();

      reader.onerror = () => {
        Toast.error('사진을 불러오는 중 오류가 발생했습니다.');
      };

      reader.onload = () => {
        if (typeof reader.result === 'string') {
          onSuccess(index, reader.result);
        } else {
          Toast.error('사진을 불러올 수 없습니다.');
        }
      };

      reader.readAsDataURL(convertedFile);
    } catch (err) {
      if (err instanceof Error && err.message === 'HEIC_CONVERT_TIMEOUT') {
        Toast.error('변환 시간이 초과되었습니다.\n다른 사진을 선택해 주세요.');
      } else {
        console.error(err);
        Toast.error('사진 변환에 실패했습니다.');
      }
    } finally {
      /**
       * 4️⃣ 파일 선택 사이클 종료 보장 (모바일 필수)
       */
      setIsConverting(false);
      input.value = '';
    }
  };

  return {
    isConverting,
    handleChangeFile,
  };
}
