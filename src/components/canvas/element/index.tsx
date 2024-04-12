import { observer } from "mobx-react-lite";
import { Group } from "react-konva";
import { IGroupInstance } from "@/model/group-model";
import { INodeInstance } from "@/model/node-model";
import { ElementInstanceType } from "./type";
import { ImageElement } from "./image-element";

interface IElementProps {
  element: INodeInstance;
}

export const Element = observer<IElementProps>(({ element }) => {
  const Comp = ELEMENT_TYPES_MAP[element.type];
  return Comp ? (
    <Comp element={element as ElementInstanceType} />
  ) : (
    (console.error("Can not find component for " + element.type), null)
  );
});

interface IGroupElementProps {
  element: IGroupInstance;
}

const GroupElement = observer<IGroupElementProps>(({ element }) => {
  return (
    <Group>
      {element.children.map((child) => (
        <Element key={child.id} element={child} />
      ))}
    </Group>
  );
});

type ElementCompType = typeof GroupElement | typeof ImageElement;

const ELEMENT_TYPES_MAP: Record<string, ElementCompType> = {
  group: GroupElement,
  image: ImageElement,
};
