"use client";

import { Card, CardHeader, Image } from "@nextui-org/react";

const CardHero = () => {
  return (
    <Card className="col-span-12 h-[300px] sm:col-span-4">
      <CardHeader className="absolute top-1 z-10 flex-col !items-start">
        <p className="text-tiny font-bold uppercase text-white/60">
          Envie de mesurer l&apos;utilité de vos réunion
        </p>
        <h4 className="text-large font-medium text-white">
          Fait le avec la jauge en temps réel de JINX
        </h4>
      </CardHeader>
      <Image
        removeWrapper
        alt="Card background"
        className="z-0 h-full w-full object-cover"
        src="/meter.jpg"
      />
    </Card>
  );
};

export default CardHero;
