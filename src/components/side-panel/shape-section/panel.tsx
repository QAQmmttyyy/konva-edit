import { FC } from "react";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { ElementItem } from "./element-item";
import { elements, type } from "./shape-elements.json";
import { ElementItemDragOverlay } from "./element-item-drag-overlay";

export const ShapePanel: FC<{ name: string }> = ({ name }) => {
  return (
    <TabsContent value={name} className="w-[301px] !ml-0 bg-white border-r">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>
          click or drag to add the shape element.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 place-content-stretch">
          {elements.map((element) => (
            <ElementItem
              key={element.id}
              className="h-20"
              data={{ type, ...element }}
            />
          ))}
        </div>
      </CardContent>
      <ElementItemDragOverlay />
    </TabsContent>
  );
};
