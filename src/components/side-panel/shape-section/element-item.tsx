import { FC } from "react";
import { Draggable } from "@/components/dnd/draggble";

interface IElementItemData {
  id: string;
  name: string;
  src: string;
}

interface IElementItemProps {
  type: string; // need to match model.type
  data: IElementItemData;
}

export const ElementItem: FC<IElementItemProps> = ({ type, data }) => {
  const { id, name, src } = data;
  return (
    <Draggable args={{ id, data: { type, ...data } }}>
      <div
        key={id + name}
        className="h-20 flex items-center justify-center rounded-sm hover:bg-slate-100"
      >
        <img src={src} alt={name} />
      </div>
    </Draggable>
  );
};
