import { create } from 'zustand';

type Step = 1 | 2 | 3;

interface ProgressState {
  getStepByPath: (path: string) => Step;
}

export const useProgressStore = create<ProgressState>(() => ({
  getStepByPath: path => {
    if (path.startsWith('/frame/select')) return 1;
    if (path.startsWith('/frame/view')) return 2;
    if (path.startsWith('/frame/edit')) return 3;
    return 1;
  },
}));
