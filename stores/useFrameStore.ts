import { ColorItem } from '@/types/colors';
import { create } from 'zustand';

export type Layout = '1x2' | '1x3' | '1x4' | '2x2';
export type FrameBg = 'white' | 'pink' | 'blue';

export interface FrameState {
  layout: Layout;
  setLayout: (layout: Layout) => void;

  images: (string | null)[];
  setImage: (index: number, url: string | null) => void;
  reorderImages: (from: number, to: number) => void;

  color: ColorItem['id'];
  setColor: (color: ColorItem['id']) => void;
  reset: () => void;
}

const initialState = {
  layout: '1x4' as Layout,
  images: Array(4).fill(null),
  color: 'none' as ColorItem['id'],
};

const isBlobUrl = (v: unknown): v is string => typeof v === 'string' && v.startsWith('blob:');

const revokeIfBlobUrl = (v: string | null) => {
  if (isBlobUrl(v)) {
    URL.revokeObjectURL(v);
  }
};

const revokeAllBlobUrls = (arr: (string | null)[]) => {
  for (const v of arr) revokeIfBlobUrl(v);
};

export const useFrameStore = create<FrameState>(set => ({
  ...initialState,
  setLayout: layout => set({ layout }),

  setImage: (index, url) =>
    set(state => {
      const prev = state.images[index] ?? null;

      if (prev === url) return { images: state.images };

      revokeIfBlobUrl(prev);

      const next = [...state.images];
      next[index] = url;
      return { images: next };
    }),

  reorderImages: (from, to) =>
    set(state => {
      const arr = [...state.images];
      if (from === to) return { images: arr };
      const [moved] = arr.splice(from, 1);
      arr.splice(to, 0, moved);
      return { images: arr };
    }),

  setColor: color => set({ color }),

  reset: () =>
    set(state => {
      revokeAllBlobUrls(state.images);
      return {
        ...initialState,
        images: Array(4).fill(null),
      };
    }),
}));
