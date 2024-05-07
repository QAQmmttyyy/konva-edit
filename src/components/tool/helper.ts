import Konva from "konva";

export function getPointerPositionInStage(
  ev: Konva.KonvaPointerEvent,
  stageX: number,
  stageY: number
) {
  return (
    ev.target.getStage()?.getRelativePointerPosition() ?? {
      x: ev.evt.clientX - stageX,
      y: ev.evt.clientY - stageY,
    }
  );
}
