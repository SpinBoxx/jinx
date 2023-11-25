"use client";

import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";
import { getDatetimeFromTimestamp } from "@/services/utils";
import { Chip, Divider } from "@nextui-org/react";
import { useQuery } from "convex/react";
import { formatDistance } from "date-fns";
import FR from "date-fns/locale/fr";
import { Dot, Download, GanttChartSquare, MoreVertical } from "lucide-react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";

interface Props {
  props: {
    meetingId: number;
    meetingTitle: string;
    commentCustomModelChatGPT: string;
  };
}

const CommentSection = ({ props }: Props) => {
  const { commentCustomModelChatGPT, meetingId, meetingTitle } = props;
  const meetingVotes = useQuery(api.meetingVote.getMeetingVotes, {
    meetingId: meetingId,
  });

  const formattedData = (modele?: string | undefined) => {
    const comments = meetingVotes
      ?.map((meetingVote) => meetingVote.comment)
      .join(", ");
    return modele ? modele + " " + comments : comments;
  };

  const onDownloadComments = (data: string = "") => {
    var element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(data)
    );
    element.setAttribute("download", `Commentaires-${meetingTitle}.txt`);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="">
      <div className="flex items-center justify-between ">
        <div className="flex items-center gap-x-3">
          <p className="text-2xl font-bold tracking-tight text-secondary">
            Les commentaires
          </p>
          <Chip
            variant="flat"
            size="sm"
            className="px-3 text-sm text-neutral-600"
          >
            {meetingVotes?.length}
          </Chip>
        </div>

        <Dropdown placement="bottom-end" className="!w-80">
          <DropdownTrigger className="cursor-pointer">
            <MoreVertical className="mt-2 h-5 w-5 flex-none" />
          </DropdownTrigger>
          <DropdownMenu aria-label="Custom item styles">
            <DropdownItem
              startContent={<Download className="h-4 w-4 flex-none" />}
              onClick={() => {
                onDownloadComments(formattedData());
              }}
              key="only"
              className="items-start "
            >
              <span className="whitespace-normal">
                1. Télécharger les commentaires pour les analyser sur ChatGPT
              </span>
            </DropdownItem>

            <DropdownItem
              startContent={<Download className="h-4 w-4" />}
              onClick={() => {
                onDownloadComments(formattedData("TEST PAR DEFAULKT"));
              }}
              key="default"
              className="items-start"
            >
              <span className="whitespace-normal">
                2. Télécharger les commentaires avec un modèle{" "}
                <span className="font-semibold">par defaut</span> pour les
                analyser sur ChatGPT
              </span>
            </DropdownItem>
            <DropdownItem
              startContent={<Download className="h-4 w-4" />}
              onClick={() => {
                onDownloadComments(formattedData(commentCustomModelChatGPT));
              }}
              key="default"
              className="items-start"
            >
              <span className="whitespace-normal">
                3. Télécharger les commentaires avec{" "}
                <span className="font-semibold">mon modèle</span> pour les
                analyser sur ChatGPT
              </span>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>

      <div className="mt-4">
        {meetingVotes?.map((meetingVote, index, { length }) => (
          <div key={index} className="flex flex-col">
            <div className="flex items-center gap-x-1">
              <span className="text-lg font-semibold">{"Anonyme"}</span>
              <Dot className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {formatDistance(
                  getDatetimeFromTimestamp(meetingVote._creationTime),
                  Date.now(),
                  { locale: FR, addSuffix: true }
                )}
              </span>
            </div>
            <div className="text-muted-foreground">{meetingVote.comment}</div>
            {((index === 0 && length !== 1) || index + 1 !== length) && (
              <Divider className={cn("my-4")} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
