import { create } from "zustand";

interface ShareMeetingLinkInterface {
  voteRoomLink: string;
  isModalOpen: boolean;
  setVoteRoomLink: (voteRoomLink: string) => void;
  toggleModalOpen: () => void;
}

export const useShareMeetingLink = create<ShareMeetingLinkInterface>(
  (set, get) => ({
    voteRoomLink: "",
    isModalOpen: false,
    setVoteRoomLink: (voteRoomLink: string) => {
      set({ voteRoomLink });
    },
    toggleModalOpen: () => set({ isModalOpen: !get().isModalOpen }),
  })
);
