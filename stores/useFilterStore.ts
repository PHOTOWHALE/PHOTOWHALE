import { create } from 'zustand';

interface FilterState {
  filter: string | null;
  setFilter: (filter: string | null) => void;
  reset: () => void;
}

const initialState = {
  filter: 'none' as string | null,
};

const useFilterStore = create<FilterState>(set => ({
  ...initialState,
  setFilter: filter => set({ filter }),
  reset: () => set(initialState),
}));

export default useFilterStore;
