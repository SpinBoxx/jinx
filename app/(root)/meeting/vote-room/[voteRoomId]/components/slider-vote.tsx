"use client";

import { fetchCustom } from "@/lib/fetch-custom";
import { cn } from "@/lib/utils";
import { ApiResponse } from "@/types/api-response";
import {
  meetingVoteMaxValue,
  meetingVoteMinValue,
  meetingVoteStepValue,
} from "@/types/meeting";
import { Button, Slider, SliderValue } from "@nextui-org/react";
import { MeetingVote } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { useState } from "react";

interface Props {
  className?: string;
  voteRoomId: string;
}

const SliderVote = ({ className, voteRoomId }: Props) => {
  const [value, setValue] = useState<SliderValue>(5);
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setLoading(true);
    const response = await fetchCustom(`/meeting/room-vote/${voteRoomId}`, {
      method: "POST",
      body: JSON.stringify({ note: value }),
    });
    const data: ApiResponse<MeetingVote> = await response.json();
    if (response.ok) {
      console.log(data);
    }
    console.log(value);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <p>Jugez-vous utile cette reunion (0 pas du tout, 10 beaucoup)</p>
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
