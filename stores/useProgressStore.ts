import { create } from 'zustand';

interface ProgressState {
  currentStep: number;
  setStep: (step: number) => void;
}

export const useProgressStore = create<ProgressState>(set => ({
  currentStep: 1,
  setStep: step => set({ currentStep: step }),
}));
