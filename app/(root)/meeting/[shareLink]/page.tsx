import Header from "@/components/header";
import prismadb from "@/lib/prismadb";
import { format } from "date-fns";
import FR from "date-fns/locale/fr";
import { Presentation, User } from "lucide-react";
import { redirect } from "next/navigation";
import { Gauge } from "./components/gauge";
import { Card } from "@nextui-org/react";

interface Props {
  params: {
    shareLink: string;
  };
}
export const revalidate = 0;

const MeetingDetail = async ({ params }: Props) => {
  const meeting = await prismadb.meeting.findFirst({
    where: {
      shareLink: params.shareLink,
    },
    include: {
      creator: true,
    },
  });

  if (!meeting) redirect("/");

  return (
    <div>
      <Header
        data={{ title: meeting.title, description: meeting.description }}
      />
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
          <p className="text-2xl font-bold tracking-tight text-secondary">
            Jauge en temps réel
          </p>
          <Card>
            <Gauge value={40} />
          </Card>
        </div>
        <div className="!mt-12 space-y-4">
          <p className="text-2xl font-bold tracking-tight text-secondary">
            Les commentaires
          </p>
          <Card>
            <p>Bonjour</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MeetingDetail;
