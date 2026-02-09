export async function convertHeic(file: File, retryCount = 0): Promise<File> {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/convert', {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      throw new Error('Server conversion failed');
    }

    const blob = await res.blob();
    return new File([blob], file.name.replace(/\.[^/.]+$/, '') + '.jpg', {
      type: 'image/jpeg',
    });
  } catch (e) {
    console.error(`변환 시도 ${retryCount + 1}회 실패:`, e);

    // 재시도 로직
    if (retryCount < 1) {
      console.log('재시도 중...');
      return convertHeic(file, retryCount + 1);
    }

    // 최종 실패 시 에러 출력
    throw new Error(
      '이미지 변환에 실패했습니다. 파일 상태를 확인하거나 잠시 후 다시 시도해주세요.',
    );
  }
}
