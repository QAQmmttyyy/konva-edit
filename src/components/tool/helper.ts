import Konva from "konva";
import { KonvaNodeEvents } from "react-konva";

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

export function bindToolEventHandlers(
  target: Konva.Node,
  handlers: KonvaNodeEvents
) {
  for (const [eventType, handler] of Object.entries(handlers)) {
    target.on(eventType.slice(2).toLowerCase(), handler);
  }
}

export function getZoomPercentage(scale: number) {
  return Math.round(scale * 100) + "%";
}
