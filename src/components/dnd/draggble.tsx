import { FC, PropsWithChildren } from "react";
import { UseDraggableArguments, useDraggable } from "@dnd-kit/core";

export const Draggable: FC<
  PropsWithChildren<{ args: UseDraggableArguments }>
> = ({ args, children }) => {
  const { attributes, listeners, setNodeRef } = useDraggable(args);

  return (
    <div ref={setNodeRef} className="touch-none" {...listeners} {...attributes}>
      {children}
    </div>
  );
};
