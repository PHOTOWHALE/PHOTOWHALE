import { useFrameStore } from '@/stores/useFrameStore';
import useSkinStore from '@/stores/useSkinStore';

const resetFrameStores = () => {
  useFrameStore.getState().reset();
  useSkinStore.getState().reset();
};

export default resetFrameStores;
