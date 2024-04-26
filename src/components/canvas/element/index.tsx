import { FC } from "react";
import { observer } from "mobx-react-lite";
import { Group } from "react-konva";
import { ELEMENT_NODE_NAME } from "@/lib/constants";
import { IGroupInstance } from "@/model/group-model";
import { INodeInstance } from "@/model/node-model";
import { ELEMENT_REGISTRY } from "@/lib/element-register";

interface IElementProps {
  element: INodeInstance;
}

export type ElementComponentType = FC<IElementProps>;

export const Element = observer<IElementProps>(({ element }) => {
  console.log("rendering element", element.type);

  const Comp = ELEMENT_REGISTRY[element.type]?.component;
  return Comp ? (
    <Comp element={element} />
  ) : (
    (console.error("Can not find component for " + element.type), null)
  );
});

interface IGroupElementProps {
  element: IGroupInstance;
}

export const GroupElement = observer<IGroupElementProps>(({ element }) => {
  return (
    <Group name={ELEMENT_NODE_NAME}>
      {element.children.map((child) => (
        <Element key={child.id} element={child} />
      ))}
    </Group>
  );
});
