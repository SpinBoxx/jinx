"use client";
import { useOrigin } from "@/hooks/use-origin";
import { useShareMeetingLink } from "@/hooks/use-share-meeting-link";
import { cn } from "@/lib/utils";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Divider,
  Input,
} from "@nextui-org/react";
import { Copy, CopyCheck, Mail, Paperclip, X } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ModalShareMeetingLink = () => {
  const { isModalOpen, toggleModalOpen, voteRoomLink } = useShareMeetingLink();
  const origin = useOrigin();
  const [isMobile, setIsMobile] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 648);
  }, [window.innerWidth]);

  const urlToCopy = `${origin}/meeting/vote-room/${voteRoomLink}`;
  const onCopy = () => {
    setIsCopied(true);
    navigator.clipboard.writeText(urlToCopy);
    toast.success("Le lien a bien été copié !");
    setTimeout(() => setIsCopied(false), 1000);
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
              Partager le salon de vote
            </ModalHeader>
            <Divider />
            <ModalBody>
              <p className="text-foreground-500">
                Ce lien unique vous permettra d&apos;inviter les personnes
                présentes dans cette réunion pour jauger l&apos;utilité de votre
                réunion.
              </p>
              <div className="flex flex-row gap-x-8">
                <a href="mailto:" className="w-fit space-y-2">
                  <Button
                    isIconOnly
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-500"
                  >
                    <Mail className="text-white" />
                  </Button>
                  <p className="select-none text-center">Email</p>
                </a>
                <div className="w-fit cursor-pointer space-y-2">
                  <Button
                    onClick={onCopy}
                    disabled={isCopied}
                    isIconOnly
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary"
                  >
                    <Paperclip className="text-white" />
                  </Button>
                  <p className="select-none text-center">Copier</p>
                </div>
              </div>
              <div>
                <Input
                  endContent={
                    <Button
                      isIconOnly
                      onClick={onCopy}
                      disabled={isCopied}
                      className={cn(isCopied && "bg-green-300")}
                    >
                      {isCopied ? (
                        <CopyCheck className="text-green-700" />
                      ) : (
                        <Copy className="text-gray-600" />
                      )}
                    </Button>
                  }
                  readOnly
                  value={urlToCopy}
                />
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

export default ModalShareMeetingLink;
