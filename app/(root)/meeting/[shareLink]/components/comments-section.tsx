"use client";

import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";
import { getDatetimeFromTimestamp } from "@/services/utils";
import { Chip, Divider } from "@nextui-org/react";
import { useQuery } from "convex/react";
import { fromUnixTime, formatDistance } from "date-fns";
import FR from "date-fns/locale/fr";
import { Dot } from "lucide-react";

interface Props {
  meetingId: number;
}

const CommentSection = ({ meetingId }: Props) => {
  const meetingVotes = useQuery(api.meetingVote.getMeetingVotes, {
    meetingId: meetingId,
  });
  return (
    <div className="">
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

      <div className="mt-4">
        {meetingVotes?.map((meetingVote, index, { length }) => (
          <div className="flex flex-col ">
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
