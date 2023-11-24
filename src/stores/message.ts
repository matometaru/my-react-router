import { create } from 'zustand';

export type MessageObject = {
  loading: boolean;
  text: string;
};

type LoadingStore = {
  store: MessageObject;
  showLoading: (text: string) => void;
  hideLoading: () => void;
};

export const useLoadingStore = create<LoadingStore>((set) => ({
  store: { loading: false, text: '' },

  showLoading: (text: string) => set(() => ({
    store: { loading: true, text }
  })),

  hideLoading: () => set(() => ({
    store: { loading: false, text: '' }
  }))
}));
