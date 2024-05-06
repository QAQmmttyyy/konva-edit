import Konva from "konva";
import { forwardRef } from "react";
import { KonvaNodeEvents, Rect } from "react-konva";

interface IToolInteractionAreaProps extends Konva.RectConfig, KonvaNodeEvents {}

export const ToolInteractionArea = forwardRef<
  Konva.Rect,
  IToolInteractionAreaProps
>((props, ref) => {
  return <Rect ref={ref} id="tool-interaction-area" x={0} y={0} {...props} />;
});
