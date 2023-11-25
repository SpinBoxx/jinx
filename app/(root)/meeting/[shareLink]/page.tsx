import Header from "@/components/header";
import prismadb from "@/lib/prismadb";
import { format } from "date-fns";
import FR from "date-fns/locale/fr";
import { MoreVertical, Presentation, User } from "lucide-react";
import { redirect } from "next/navigation";
import { Gauge } from "./components/gauge";
import {
  Card,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import ButtonOpenVoteRoom from "./components/open-vote-room-button";
import DropdownSettings from "./components/dropdown-settings";
import ModalShowMeetingSettings from "./components/modal-show-meeting-settings";
import CommentSection from "./components/comments-section";
import { auth } from "@/auth";
import { signOut } from "next-auth/react";

interface Props {
  params: {
    shareLink: string;
  };
}
export const revalidate = 0;

const MeetingDetail = async ({ params }: Props) => {
  const session = await auth();

  const meeting = await prismadb.meeting.findFirst({
    where: {
      shareLink: params.shareLink,
    },
    include: {
      creator: true,
      meetingVote: true,
    },
  });

  const user = await prismadb.user.findFirst({
    where: {
      email: session?.user?.email,
    },
  });

  if (!user) return signOut();

  if (!meeting) redirect("/");

  const value = meeting?.meetingVote.reduce(
    (res, vote) => (res += vote.note),
    0
  );

  return (
    <div>
      <div className="flex items-start justify-between gap-x-8 lg:items-end">
        <Header
          data={{ title: meeting.title, description: meeting.description }}
        />
        <DropdownSettings meeting={meeting} />
      </div>

      <div className="mt-8 space-y-4">
        <div className="flex items-center gap-x-4">
          <div className="flex items-center justify-center rounded-lg bg-secondary/30 p-3 backdrop-blur-lg">
            <User className="h-6 w-6 text-blue-600" strokeWidth={2.2} />
          </div>
          <div>
            <p className="font-semibold">{meeting.creator.username}</p>
            <p className="text-foreground-500">{meeting.creator.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-x-4">
          <div className="flex items-center justify-center rounded-lg bg-secondary/30 p-3 backdrop-blur-lg">
            <Presentation className="h-6 w-6 text-blue-600" strokeWidth={2.2} />
          </div>
          <div>
            <p className="font-semibold">
              {format(meeting.when, "PPP", { locale: FR })}
            </p>
            <p className="text-foreground-500">
              {meeting.participants} participants
            </p>
          </div>
        </div>
        <div className="!mt-12 space-y-4">
          <div className="flex justify-between">
            <p className="text-2xl font-bold tracking-tight text-secondary [text-wrap:balance]">
              Jauge en temps réel
            </p>
            <ButtonOpenVoteRoom voteRoomId={meeting.voteRoomLink} />
          </div>

          <Card>
            <Gauge meetingId={meeting.id} />
          </Card>
        </div>
        <div className="!mt-12 ">
          <CommentSection
            props={{
              meetingId: meeting.id,
              meetingTitle: meeting.title,
              commentCustomModelChatGPT: user.commentCustomModelChatGPT ?? "",
            }}
          />
        </div>
      </div>
      <ModalShowMeetingSettings />
    </div>
  );
};

export default MeetingDetail;
