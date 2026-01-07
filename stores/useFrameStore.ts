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

export const useFrameStore = create<FrameState>(set => ({
  ...initialState,
  setLayout: layout => {
    const imageCount = layout.split('x').reduce((a, b) => +a * +b, 1);
    set({
      layout,
      images: Array(imageCount).fill(null),
    });
  },

  setImage: (index, url) =>
    set(state => {
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

  reset: () => set(initialState),
}));
