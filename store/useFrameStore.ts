import { create } from 'zustand';

export type Layout = '1x2' | '1x3' | '1x4' | '2x2';
export type FrameBg = 'white' | 'pink' | 'blue';

interface FrameState {
  layout: Layout;
  setLayout: (layout: Layout) => void;

  images: (string | null)[];
  setImage: (index: number, url: string | null) => void;
  reorderImages: (from: number, to: number) => void;

  bg: FrameBg;
  setBg: (bg: FrameBg) => void;
}

export const useFrameStore = create<FrameState>(set => ({
  layout: '1x4',
  setLayout: layout => set({ layout }),

  images: Array(4).fill(null),
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

  bg: 'white',
  setBg: bg => set({ bg }),
}));
