import { FC, PropsWithChildren } from "react";
import { DndContext } from "@dnd-kit/core";

export const AppDndContext: FC<PropsWithChildren> = ({ children }) => {
  const dndHandler = (ev: unknown) => console.log(ev);
  return (
    <DndContext
      onDragStart={dndHandler}
      // onDragMove={dndHandler}
      onDragEnd={dndHandler}
      onDragOver={dndHandler}
      onDragCancel={dndHandler}
    >
      {children}
    </DndContext>
  );
};
