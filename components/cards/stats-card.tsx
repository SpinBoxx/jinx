"use client";

import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Divider,
  Image,
} from "@nextui-org/react";
import { LucideIcon, Plus, User } from "lucide-react";

interface Props {
  data: {
    title: string;
    rightIcon?: JSX.Element;
    statIcon?: JSX.Element;
    stat: string;
    statBonus?: JSX.Element;
  };
}

const CardStats = ({ data }: Props) => {
  return (
    <Card className="relative  !py-4">
      <CardHeader className="flex justify-between gap-3 !py-1 text-foreground-500">
        <span className="text-md font-bold ">{data.title}</span>
        {data.rightIcon && data.rightIcon}
      </CardHeader>

      <CardBody className="flex flex-row items-center gap-x-4 !py-0">
        <span className="flex w-fit items-center text-3xl font-bold text-secondary">
          {data.statIcon && data.statIcon}
          {data.stat}
        </span>
        {data.statBonus}
      </CardBody>
    </Card>
  );
};

export default CardStats;
