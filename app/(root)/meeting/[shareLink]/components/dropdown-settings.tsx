"use client";
import { useModalMeetingSettings } from "@/hooks/use-modal-meeting-settings.tsx";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { Meeting } from "@prisma/client";
import { MoreVertical, Settings } from "lucide-react";

interface Props {
  meeting: Meeting;
}

const DropdownSettings = ({ meeting }: Props) => {
  const { setMeeting } = useModalMeetingSettings();
  return (
    <Dropdown showArrow offset={8} placement="bottom-end">
      <DropdownTrigger className="cursor-pointer">
        <MoreVertical className="mt-2 h-5 w-5 flex-none" />
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem
          startContent={<Settings className="h-4 w-4" />}
          onClick={() => setMeeting(meeting)}
          key="new"
        >
          Ouvrir les paramètres
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropdownSettings;
