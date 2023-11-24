import { fetchCustom } from "@/lib/fetch-custom";
import { Meeting } from "@prisma/client";
import { create } from "zustand";

interface ShareMeetingLinkInterface {
  meeting: Meeting | null;
  isModalOpen: boolean;

  setMeeting: (meeting: Meeting) => void;
  toggleModalOpen: () => void;
}

export const useModalMeetingSettings = create<ShareMeetingLinkInterface>(
  (set, get) => ({
    meeting: null,
    isModalOpen: false,
    setMeeting: (meeting: Meeting) => {
      set({ meeting, isModalOpen: true });
    },
    toggleModalOpen: () => set({ isModalOpen: !get().isModalOpen }),
  })
);
