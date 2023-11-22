"use client";

import { useShareMeetingLink } from "@/hooks/use-share-meeting-link";
import { Button } from "@nextui-org/react";
import { useEffect } from "react";
interface Props {
  voteRoomId: string;
}

const ButtonOpenVoteRoom = ({ voteRoomId }: Props) => {
  const { toggleModalOpen, setVoteRoomLink } = useShareMeetingLink();

  useEffect(() => {
    setVoteRoomLink(voteRoomId);
  }, []);

  return <Button onClick={toggleModalOpen}>Partager</Button>;
};

export default ButtonOpenVoteRoom;
