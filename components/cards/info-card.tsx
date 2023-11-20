import { Card, CardBody } from "@nextui-org/react";
import { Info } from "lucide-react";

interface Props {
  className?: string;
}

const CardInfo = ({ className }: Props) => {
  return (
    <Card className={className}>
      <CardBody>
        <div className="flex flex-row gap-x-4">
          <Info className="mt-1 h-5 w-5 flex-none text-orange-500" />
          <span>
            Le créateur de cette réunion vous a invitez a jugez la pertinence de
            sa reunion.
          </span>
        </div>
      </CardBody>
    </Card>
  );
};

export default CardInfo;
