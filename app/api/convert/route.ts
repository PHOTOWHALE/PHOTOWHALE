import { NextResponse } from 'next/server';
import sharp from 'sharp';
import convert from 'heic-convert';

export const runtime = 'nodejs'; // 안정성 추가

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: '파일이 없습니다.' }, { status: 400 });
    }

    // 1. 파일을 Buffer로 변환
    const buffer = Buffer.from(await file.arrayBuffer());

    // 2. Heic -> JPEG로 디코딩
    const outputBuffer = await convert({
      buffer: buffer,
      format: 'JPEG',
      quality: 1,
    });

    // 3. Sharp로 최종 최적화
    const finalImage = await sharp(outputBuffer).jpeg({ quality: 80 }).toBuffer();

    // 4. 변환된 이미지 반환
    return new NextResponse(new Uint8Array(finalImage), {
      headers: {
        'Content-Type': 'image/jpeg',
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: '변환 실패' }, { status: 500 });
  }
}
