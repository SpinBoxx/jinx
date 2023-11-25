"use client";
import { useModalMeetingSettings } from "@/hooks/use-modal-meeting-settings.tsx";
import { useOrigin } from "@/hooks/use-origin";
import { useShareMeetingLink } from "@/hooks/use-share-meeting-link";
import { fetchCustom } from "@/lib/fetch-custom";
import { cn } from "@/lib/utils";
import { ApiResponse } from "@/types/api-response";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Divider,
  Input,
  Switch,
} from "@nextui-org/react";

import { Copy, CopyCheck, Mail, Paperclip, X } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ModalShowMeetingSettings = () => {
  const { isModalOpen, toggleModalOpen, meeting } = useModalMeetingSettings();
  const [isMobile, setIsMobile] = useState(false);
  const [showGauge, setShowGauge] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 648);
  }, [window.innerWidth]);

  useEffect(() => {
    if (meeting) setShowGauge(meeting.showGaugeInVoteRoom);
  }, [meeting]);

  if (!meeting) return null;

  const onSwitchShowGauge = async () => {
    const response = await fetchCustom(
      `/meeting/${meeting.id}/toggle-show-gauge`
    );
    const data = await response.json();
    if (response.ok) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  };

  return (
    <Modal
      classNames={{
        closeButton: "top-3 right-4",
      }}
      isOpen={isModalOpen}
      placement={isMobile ? "bottom" : "center"}
      onOpenChange={toggleModalOpen}
      closeButton={
        <Button isIconOnly size="sm">
          <X className="h-20 w-20 " />
        </Button>
      }
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 [text-wrap:balance]">
              Partager le salon de vote {meeting.title}
            </ModalHeader>
            <Divider />
            <ModalBody>
              <div className="flex w-full flex-col items-start justify-between gap-y-4">
                <div className="flex w-full justify-between gap-x-10">
                  <p className="font-semibold">
                    Afficher la jauge dans le salon de vote
                  </p>
                  <Switch
                    isSelected={showGauge}
                    onValueChange={() => {
                      onSwitchShowGauge();
                      setShowGauge(!showGauge);
                    }}
                  />
                </div>
                <span className="text-muted-foreground">
                  En activant cette option, vous afficherez la jauge que vous
                  voyez dans votre détail de réunion à tous ceux qui auront reçu
                  le salon de vote{" "}
                </span>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onPress={onClose}>
                Fermer
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalShowMeetingSettings;
