"use client";

import { getMeetingVotes } from "@/actions/getMeetingVote";
import { api } from "@/convex/_generated/api";
import { fetchCustom } from "@/lib/fetch-custom";
import { cn } from "@/lib/utils";
import { ApiResponse } from "@/types/api-response";
import {
  meetingVoteMaxValue,
  meetingVoteMinValue,
  meetingVoteStepValue,
} from "@/types/meeting";
import { Button, Slider, SliderValue } from "@nextui-org/react";
import { useMutation } from "convex/react";
import { Loader2 } from "lucide-react";
import { useState } from "react";

interface Props {
  className?: string;
  voteRoomId: string;
  meetingId: number;
}

const SliderVote = ({ className, voteRoomId, meetingId }: Props) => {
  const [value, setValue] = useState<SliderValue>(5);
  const [loading, setLoading] = useState(false);

  const createVote = useMutation(api.meetingVote.createMeetingVote);

  const onSubmit = () => {
    setLoading(true);
    createVote({ meetingId, note: value.valueOf() as number });
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <p>Jugez-vous utile cette reunion (0 pas du tout, 10 beaucoup) </p>
      <Slider
        label="0"
        value={value}
        onChange={setValue}
        step={meetingVoteStepValue}
        maxValue={meetingVoteMaxValue}
        minValue={meetingVoteMinValue}
        className={cn(className, "")}
      />
      <Button
        className="w-full"
        disabled={loading}
        color="secondary"
        onClick={onSubmit}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          "Envoyer le vote"
        )}
      </Button>
    </div>
  );
};

export default SliderVote;
