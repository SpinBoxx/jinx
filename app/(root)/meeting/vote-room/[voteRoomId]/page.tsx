import Header from "@/components/header";
import prismadb from "@/lib/prismadb";

import { redirect } from "next/navigation";
import SliderVoteForm from "./components/slider-vote";
import CardInfo from "@/components/cards/info-card";
import { Gauge } from "../../[shareLink]/components/gauge";
import { Card } from "@nextui-org/react";

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
      meetingVote: true,
    },
  });

  if (!meeting) redirect("/");

  const value = meeting?.meetingVote.reduce(
    (res, vote) => (res += vote.note),
    0
  );

  return (
    <div>
      <Header data={{ title: meeting.title }} />
      {meeting.showGaugeInVoteRoom && (
        <Card className="mt-4">
          <Gauge meetingId={meeting.id} />
        </Card>
      )}
      <div className="mt-4 space-y-4">
        <SliderVoteForm meetingId={meeting.id} voteRoomId={params.voteRoomId} />
      </div>
    </div>
  );
};

export default MeetingVoteRoomPage;
