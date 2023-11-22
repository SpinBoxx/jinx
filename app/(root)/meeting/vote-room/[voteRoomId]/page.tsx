import Header from "@/components/header";
import prismadb from "@/lib/prismadb";

import { redirect } from "next/navigation";
import SliderVote from "./components/slider-vote";
import CardInfo from "@/components/cards/info-card";

interface Props {
  params: {
    voteRoomId: string;
  };
}
export const revalidate = 0;

const MeetingVoteRoomPage = async ({ params }: Props) => {
  const meeting = await prismadb.meeting.findFirst({
    where: {
      voteRoomLink: params.voteRoomId,
    },
    include: {
      creator: true,
    },
  });

  if (!meeting) redirect("/");

  return (
    <div>
      <Header data={{ title: meeting.title }} />
      <div className="mt-4 space-y-4">
        <CardInfo />
        <SliderVote meetingId={meeting.id} voteRoomId={params.voteRoomId} />
      </div>
    </div>
  );
};

export default MeetingVoteRoomPage;
