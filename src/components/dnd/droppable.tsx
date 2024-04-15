import { FC, PropsWithChildren } from "react";
import { UseDroppableArguments, useDroppable } from "@dnd-kit/core";

export const Droppable: FC<
  PropsWithChildren<{ args: UseDroppableArguments }>
> = ({ args, children }) => {
  const { setNodeRef } = useDroppable(args);

  return (
    <div ref={setNodeRef} id={args.id as string}>
      {children}
    </div>
  );
};
