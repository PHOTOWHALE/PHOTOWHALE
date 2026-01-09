import { create } from 'zustand';

interface StickerState {
  selectedSticker: string | null;
  setSelectedSticker: (sticker: string | null) => void;
}

const useStickerStore = create<StickerState>(set => ({
  selectedSticker: null,
  setSelectedSticker: sticker => set({ selectedSticker: sticker }),
}));

export default useStickerStore;
