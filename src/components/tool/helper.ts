import Konva from "konva";
import { IRect, Vector2d } from "konva/lib/types";
import { KonvaNodeEvents } from "react-konva";

export function getRelativePointerPositionInLayer(
  ev: PointerEvent,
  pageX: number = 0,
  pageY: number = 0
) {
  return {
    x: ev.offsetX - pageX,
    y: ev.offsetY - pageY,
  };
}

export function bindToolEventHandlers(
  target: Konva.Node,
  handlers: KonvaNodeEvents
) {
  for (const [eventType, handler] of Object.entries(handlers)) {
    target.on(eventType.slice(2).toLowerCase(), handler);
  }

  return () => {
    for (const [eventType, handler] of Object.entries(handlers)) {
      target.off(eventType.slice(2).toLowerCase(), handler);
    }
  };
}

export function getZoomPercentage(scale: number) {
  return Math.round(scale * 100) + "%";
}

export function getLinePointsToRelativeToBound(
  points: number[],
  bound: IRect = { x: 0, y: 0, width: 0, height: 0 }
) {
  const result = [];

  for (let i = 0; i < points.length; i += 2) {
    result.push(points[i] - bound.x, points[i + 1] - bound.y);
  }

  return result;
}

interface ITransform {
  translation: Vector2d;
  scale: Vector2d;
}

export function getInverseTransformedPoint(
  point: Vector2d,
  transform: ITransform
) {
  return {
    x: (point.x - transform.translation.x) / transform.scale.x,
    y: (point.y - transform.translation.y) / transform.scale.y,
  };
}

export function getInverseTransformedLinePoints(
  points: number[],
  transform: ITransform
) {
  const result = [];

  for (let i = 0; i < points.length; i += 2) {
    const inversePoint = getInverseTransformedPoint(
      {
        x: points[i],
        y: points[i + 1],
      },
      transform
    );
    result.push(inversePoint.x, inversePoint.y);
  }

  return result;
}
