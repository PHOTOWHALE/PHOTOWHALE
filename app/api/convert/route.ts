import { NextRequest } from 'next/server';
import sharp from 'sharp';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return new Response('No file', { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  try {
    const jpgBuffer = await sharp(buffer).jpeg({ quality: 85 }).toBuffer();

    return new Response(new Uint8Array(jpgBuffer), {
      headers: {
        'Content-Type': 'image/jpeg',
      },
    });
  } catch {
    return new Response('Failed to convert image', { status: 500 });
  }
}
