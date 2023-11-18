import { create } from "zustand";

interface ShareMeetingLinkInterface {
  shareLink: string;
  isModalOpen: boolean;
  setShareLink: (shareLink: string) => void;
  toggleModalOpen: () => void;
}

export const useShareMeetingLink = create<ShareMeetingLinkInterface>(
  (set, get) => ({
    shareLink: "",
    isModalOpen: false,
    setShareLink: (shareLink: string) => {
      set({ shareLink });
    },
    toggleModalOpen: () => set({ isModalOpen: !get().isModalOpen }),
  })
);
