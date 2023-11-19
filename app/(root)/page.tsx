import { Metadata } from "next";
import CardHero from "./components/card-hero";
import CardStats from "@/components/cards/stats-card";
import { Gauge, LineChart, Plus, PlusCircle, TrendingUp } from "lucide-react";
import { Button, Chip, Link } from "@nextui-org/react";
import CardMeeting from "@/components/cards/meeting-card";
import prismadb from "@/lib/prismadb";

export const metadata: Metadata = {
  title: "Jinx",
};

export const revalidate = 0;

export default async function Home() {
  const meetings = await prismadb.meeting.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="space-y-8 pb-20">
      <section id="header" className="w-full space-y-4">
        <CardHero />
        <CardStats
          data={{
            title: "Nb de réunion créée",
            stat: meetings.length.toString(),
            statIcon: <Plus strokeWidth={4} />,
            rightIcon: <LineChart />,
            statBonus: (
              <Chip
                startContent={<Plus strokeWidth={2} className="h-4 w-4" />}
                className="flex bg-green-100  text-green-500"
              >
                5 pendant les 7 derniers jours
              </Chip>
            ),
          }}
        />
        <CardStats
          data={{
            title: "Score moyen de mes réunions",
            stat: "6/10",
            statIcon: <TrendingUp strokeWidth={3} className="mr-2" />,
            rightIcon: <Gauge />,
            statBonus: (
              <Chip className="flex bg-green-100  text-green-500">
                Moyenne sur 31 votants
              </Chip>
            ),
          }}
        />
      </section>
      <section className="space-y-4">
        <div className="flex items-end justify-between">
          <span className="text-xl font-bold tracking-tight text-black">
            Mes dernières réunions
          </span>
          <span className="text-sm font-medium text-blue-500">Voir tout</span>
        </div>
        {meetings.map((meeting) => (
          <CardMeeting key={meeting.id} props={{ meeting }} />
        ))}
      </section>
      <div className="fixed inset-x-0 bottom-4 px-6">
        <Link href="/ajouter-une-reunion" className="w-full hover:!opacity-95">
          <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:!opacity-95">
            <PlusCircle className="h-6 w-6" />
            Ajouter une réunion
          </Button>
        </Link>
      </div>
    </div>
  );
}
