import { create } from 'zustand';

interface FrameStoreProps {
  selectedFrame: string;
  setSelectedFrame: (frame: string) => void;
}

export const useFrameStore = create<FrameStoreProps>(set => ({
  selectedFrame: '',
  setSelectedFrame: frame => set({ selectedFrame: frame }),
}));
