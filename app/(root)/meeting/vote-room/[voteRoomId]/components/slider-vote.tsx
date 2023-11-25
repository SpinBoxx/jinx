"use client";

import ReCAPTCHA from "react-google-recaptcha";

import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";
import {
  meetingVoteMaxValue,
  meetingVoteMinValue,
  meetingVoteStepValue,
} from "@/types/meeting";
import { Button, Card, CardBody, Slider, SliderValue } from "@nextui-org/react";
import { useMutation } from "convex/react";
import { CheckCircle, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { fetchCustom } from "@/lib/fetch-custom";
import CardInfo from "@/components/cards/info-card";

interface Props {
  className?: string;
  voteRoomId: string;
  meetingId: number;
}

const SliderVoteForm = ({ className, voteRoomId, meetingId }: Props) => {
  const [value, setValue] = useState<SliderValue>(5);
  const [loading, setLoading] = useState(false);
  const recaptcha = useRef<ReCAPTCHA>(null);
  const createVote = useMutation(api.meetingVote.createMeetingVote);

  const [alreadyVoted, setAlreadyVoted] = useState(false);

  useEffect(() => {
    const votedFor = localStorage.getItem("votedFor");

    if (votedFor) {
      const roomIds = JSON.parse(votedFor) as string[];
      setAlreadyVoted(
        roomIds.find((roomId) => roomId === voteRoomId) !== undefined ?? false
      );
    }
  }, [localStorage]);

  const onSubmit = async (formData: FormData) => {
    setLoading(true);

    if (recaptcha.current) {
      const captchaValue = recaptcha.current.getValue();
      if (!captchaValue) {
        toast.error("Veuillez faire le captcha avant d'envoyer votre note !");
      } else {
        const response = await fetchCustom("/recaptcha", {
          method: "POST",
          body: JSON.stringify({ captchaValue }),
        });
        if (response.ok) {
          createVote({ meetingId, note: value.valueOf() as number });
          toast.success("Vote envoyé avec succès !");
          localStorage.setItem("votedFor", JSON.stringify([voteRoomId]));
          setAlreadyVoted(true);
        } else {
          toast.error(
            "Une erreur innatendue est arrivé ! Veuillez raffraichir la page."
          );
        }
      }
    }
    setLoading(false);
  };

  return (
    <div>
      {!alreadyVoted ? (
        <div className="space-y-6">
          <CardInfo />
          <p>
            Jugez-vous utile cette reunion (0 pas du tout, 10 beaucoup){" "}
            {alreadyVoted && "VOTED"}{" "}
          </p>

          <form action={onSubmit} className="flex flex-col gap-y-8">
            <Slider
              label="0"
              value={value}
              onChange={setValue}
              step={meetingVoteStepValue}
              maxValue={meetingVoteMaxValue}
              minValue={meetingVoteMinValue}
              className={cn(className, "")}
            />
            <ReCAPTCHA
              ref={recaptcha}
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
              className="mx-auto"
            />
            <Button
              className="w-full"
              disabled={loading}
              color="secondary"
              type="submit"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Envoyer le vote"
              )}
            </Button>
          </form>
        </div>
      ) : (
        <div className="mt-8 flex gap-x-4">
          <Card>
            <CardBody>
              <div className="flex items-center gap-x-4 text-green-500">
                <CheckCircle className="h-8 w-8 flex-none" />
                <span className="text-xl font-semibold">
                  Vous avez déjà voté pour cette réunion, son créateur en a été
                  notifié.
                </span>
              </div>
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
};

export default SliderVoteForm;
