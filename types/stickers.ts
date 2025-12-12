import { Layout } from '@/stores/useFrameStore';

export interface StickerItem {
  id: string;
  src: string;
  label: string;
}

// 레이아웃별 스티커 목록
export const STICKERS: Record<Layout, StickerItem[]> = {
  '1x2': [
    { id: 's1', src: '/stickers/1x2-1.png', label: '스티커1' },
    { id: 's2', src: '/stickers/1x2-2.png', label: '스티커2' },
  ],
  '1x3': [
    { id: 's3', src: '/stickers/1x3-1.png', label: '스티커3' },
    { id: 's4', src: '/stickers/1x3-2.png', label: '스티커4' },
  ],
  '1x4': [
    { id: 's5', src: '/stickers/1x4-1.png', label: '스티커5' },
    { id: 's6', src: '/stickers/1x4-2.png', label: '스티커6' },
    { id: 's7', src: '/stickers/1x4-3.png', label: '스티커7' },
    { id: 's8', src: '/stickers/1x4-4.png', label: '스티커8' },
    { id: 's9', src: '/stickers/1x4-5.png', label: '스티커9' },
    { id: 's10', src: '/stickers/1x4-6.png', label: '스티커10' },
    { id: 's11', src: '/stickers/1x4-7.png', label: '스티커11' },
    { id: 's12', src: '/stickers/1x4-8.png', label: '스티커12' },
  ],
  '2x2': [
    { id: 's7', src: '/stickers/2x2-1.png', label: '스티커7' },
    { id: 's8', src: '/stickers/2x2-2.png', label: '스티커8' },
  ],
};
