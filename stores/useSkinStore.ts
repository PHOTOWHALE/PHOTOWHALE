import { create } from 'zustand';

interface SkinState {
  skin: string | null;
  setSkin: (skin: string | null) => void;
}

const useSkinStore = create<SkinState>(set => ({
  skin: 'none',
  setSkin: skin => set({ skin }),
}));

export default useSkinStore;
