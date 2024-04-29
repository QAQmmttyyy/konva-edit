import Konva from "konva";

export function getPointerPosition(ev: Konva.KonvaPointerEvent) {
  return (
    ev.target.getStage()?.getPointerPosition() ?? {
      x: ev.evt.clientX,
      y: ev.evt.clientY,
    }
  );
}
