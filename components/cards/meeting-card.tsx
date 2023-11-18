"use client";

import React from "react";
import { Card, CardBody } from "@nextui-org/react";
import { Calendar, Dot, Gauge, MoveRight, Sigma, Users } from "lucide-react";

interface Props {
  data: {
    title: string;
  };
}

export default function CardMeeting() {
  return (
    <Card shadow="none" radius="sm" className="border border-foreground-300">
      <CardBody className="space-y-1">
        <p className="font-semibold text-black">
          Réunion sur le design factory
        </p>
        <div className="flex flex-wrap  font-normal text-foreground-500">
          <div className="flex items-center gap-x-2">
            <Calendar className="h-4 w-4" /> 12/11/2023
          </div>
          <Dot />
          <div className="flex items-center gap-x-2">
            <Users className="h-4 w-4" />6 participants
          </div>
          <Dot />
          <div className="flex items-center gap-x-2">
            <Gauge className="h-5 w-5" /> 10/10
          </div>
        </div>
        <p className="text-sm text-foreground-400">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex
          doloremque modi possimus temporibus culpa repellat error ratione
          architecto nihil.
        </p>
        <div className="ml-auto flex cursor-pointer gap-x-2 text-secondary">
          Voir en détail <MoveRight />
        </div>
      </CardBody>
    </Card>
  );
}
