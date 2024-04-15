import { FC } from "react";
import { Draggable } from "@/components/dnd/draggble";
import { cn } from "@/lib/utils";

export interface IElementItemData {
  id: string;
  type: string; // need to match model.type
  name: string;
  src: string;
}

interface IElementItemProps {
  data: IElementItemData;
  className?: string;
}

export const ElementItem: FC<IElementItemProps> = ({ data, className }) => {
  const { id, name, src } = data;
  return (
    <Draggable args={{ id, data }}>
      <div
        key={id + name}
        className={cn(
          "flex items-center justify-center rounded-sm hover:bg-slate-100",
          className
        )}
      >
        <img src={src} alt={name} />
      </div>
    </Draggable>
  );
};
