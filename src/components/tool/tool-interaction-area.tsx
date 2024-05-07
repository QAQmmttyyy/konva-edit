import Konva from "konva";
import { FC } from "react";
import { KonvaNodeEvents, Rect } from "react-konva";

interface IToolInteractionAreaProps extends Konva.RectConfig, KonvaNodeEvents {}

export const ToolInteractionArea: FC<IToolInteractionAreaProps> = (props) => {
  return <Rect id="tool-interaction-area" {...props} />;
};
