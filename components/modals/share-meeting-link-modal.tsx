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
import { useState } from "react";
import toast from "react-hot-toast";

const ModalShareMeetingLink = () => {
  const { isModalOpen, toggleModalOpen, shareLink } = useShareMeetingLink();
  const origin = useOrigin();
  const [isCopied, setIsCopied] = useState(false);

  const urlToCopy = `${origin}/meeting/${shareLink}`;
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
      placement="center"
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
            <ModalHeader className="flex flex-col gap-1">
              Partager le salon
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
                <div
                  className="w-fit cursor-pointer space-y-2"
                  onClick={onCopy}
                >
                  <Button
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
