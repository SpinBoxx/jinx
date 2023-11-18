"use client";

import React from "react";
import { Card, CardBody } from "@nextui-org/react";
import { Calendar, Dot, Gauge, MoveRight, Sigma, Users } from "lucide-react";
import { Meeting } from "@prisma/client";
import { format } from "date-fns";
import FR from "date-fns/locale/fr";
import Link from "next/link";

interface Props {
  props: {
    meeting: Meeting;
  };
}

export default function CardMeeting({ props }: Props) {
  const { meeting } = props;
  return (
    <Card shadow="none" radius="sm" className="border border-foreground-300">
      <CardBody className="space-y-1">
        <p className="font-semibold text-black">{meeting.title}</p>
        <div className="flex flex-wrap  font-normal text-foreground-500">
          <div className="flex items-center gap-x-2">
            <Calendar className="h-4 w-4" />{" "}
            {format(meeting.when, "PPP", { locale: FR })}
          </div>
          <Dot />
          <div className="flex items-center gap-x-2">
            <Users className="h-4 w-4" />
            {meeting.participants} participants
          </div>
          <Dot />
          <div className="flex items-center gap-x-2">
            <Gauge className="h-5 w-5" /> 10/10
          </div>
        </div>
        <p className="text-sm text-foreground-400">{meeting.description}</p>
        <Link
          href={`/meeting/${meeting.shareLink}`}
          className="ml-auto flex cursor-pointer gap-x-2 text-secondary"
        >
          Voir en détail <MoveRight />
        </Link>
      </CardBody>
    </Card>
  );
}
