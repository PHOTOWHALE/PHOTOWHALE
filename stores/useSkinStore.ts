import { create } from 'zustand';

interface SkinState {
  skin: string | null;
  setSkin: (skin: string | null) => void;
  reset: () => void;
}

const initialState = {
  skin: 'none' as string | null,
};

const useSkinStore = create<SkinState>(set => ({
  ...initialState,
  setSkin: skin => set({ skin }),
  reset: () => set(initialState),
}));

export default useSkinStore;
