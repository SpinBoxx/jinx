import Header from "@/components/header";
import { describe } from "node:test";
import FormAddMeeting from "./components/add-meeting-form";
import { Divider } from "@nextui-org/react";

const AddMeetingPage = () => {
  return (
    <div>
      <Header
        data={{
          title: "Ajouter une réunion",
          description:
            "Remplisssez le maximum d'information pour pouvoir vous y retrouvez entre toutes vos réunions.",
        }}
      />
      <Divider className="my-3" />
      <FormAddMeeting className="" />
    </div>
  );
};

export default AddMeetingPage;
