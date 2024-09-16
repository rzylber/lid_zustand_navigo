import { createStore } from 'zustand/vanilla'

export interface BearState { 
  bears: number;
  increasePopulation: () => void;
  removeAllBears: () => void; 
}

const store = createStore<BearState>((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}));

export default store;