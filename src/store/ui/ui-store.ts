import { create } from "zustand";

interface State {
  findProductOpen: boolean;

  openendProduct: () => void;
  closeFindProduct: () => void;
}

export const useUiStore = create<State>((set) => ({
  findProductOpen: false,

  openendProduct: () => set({ findProductOpen: true }),
  closeFindProduct: () => set({ findProductOpen: false }),
}));
