"use client";
import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";

interface Props {
  className?: string;
}

const TabsComponents = ({ className }: Props) => {
  return (
    <Tabs variant="underlined" aria-label="Tabs variants" className={className}>
      <Tab key="photos" title="Photos" className="w-1/3">
        <Card>
          <CardBody>Test</CardBody>
        </Card>
      </Tab>
      <Tab key="music" title="Music" className="w-1/3">
        Tes
      </Tab>
      <Tab key="videos" title="Videos" className="w-1/3" />
    </Tabs>
  );
};

export default TabsComponents;
