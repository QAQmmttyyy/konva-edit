import Konva from "konva";
import { Vector2d } from "konva/lib/types";
import { pick } from "lodash";
import { ModelCreationData } from "mobx-keystone";
import { observer } from "mobx-react-lite";
import { useRef } from "react";
import { Group } from "react-konva";

import { useStore } from "@/context/store-context";
import { ELEMENT_TYPE } from "@/lib/constants";
import { LineModel } from "@/model/line-model.new";

import { Element } from "../canvas/element";
import {
  getInverseTransformedLinePoints,
  getLinePointsToRelativeToBound,
  getRelativePointerPositionInLayer,
} from "./helper";
import { ToolInteractionArea } from "./tool-interaction-area";
import { IToolProps } from "./type";

interface ILinePaintToolProps extends IToolProps {}

export const LinePaintTool = observer<ILinePaintToolProps>(
  ({ width, height }) => {
    const isPaintingRef = useRef(false);
    const store = useStore();

    const getBoundFromLinePoints = (point1: Vector2d, point2: Vector2d) => {
      return {
        x: Math.min(point1.x, point2.x),
        y: Math.min(point1.y, point2.y),
        width: Math.abs(point2.x - point1.x),
        height: Math.abs(point2.y - point1.y),
      };
    };

    const onPointerDown = (ev: Konva.KonvaPointerEvent) => {
      document.addEventListener("pointermove", onPointerMove);
      document.addEventListener("pointerup", onPointerUp);

      ev.cancelBubble = true;
      isPaintingRef.current = true;
      store.selectElements([]);

      const pointerPosition = getRelativePointerPositionInLayer(ev.evt);

      const lineAttrs: ModelCreationData<LineModel> = {
        id: "tempID",
        type: ELEMENT_TYPE.line,
        points: [
          pointerPosition.x,
          pointerPosition.y,
          pointerPosition.x,
          pointerPosition.y,
        ],
      };

      store.setTempElement(lineAttrs);
    };

    const onPointerMove = (ev: PointerEvent) => {
      if (!isPaintingRef.current) {
        return;
      }

      const pointerPosition = getRelativePointerPositionInLayer(ev);
      const line = store.tempElement as LineModel;
      line?.setPoints(1, pointerPosition);
    };

    const onPointerUp = () => {
      isPaintingRef.current = false;
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerup", onPointerUp);

      const line = store.tempElement as LineModel;

      const lineBound = getBoundFromLinePoints(
        {
          x: line.points[0],
          y: line.points[1],
        },
        {
          x: line.points[2],
          y: line.points[3],
        }
      );

      const lineSnapshot = Object.assign(
        pick(line, "points", "type"),
        lineBound
      );

      const inverseTransformedLineBound = {
        x: (lineBound.x - store.pageX) / store.pageScale,
        y: (lineBound.y - store.pageY) / store.pageScale,
        width: lineBound.width / store.pageScale,
        height: lineBound.height / store.pageScale,
      };

      const inverseTransformedLinePoints = getInverseTransformedLinePoints(
        lineSnapshot.points,
        {
          translation: { x: store.pageX, y: store.pageY },
          scale: { x: store.pageScale, y: store.pageScale },
        }
      );

      const finalLineSnapshot = Object.assign(
        lineSnapshot,
        inverseTransformedLineBound,
        {
          // now the points is relative to stage's left-top corner,
          // we need to transform it to relative line's self bound's left-top corner.
          points: getLinePointsToRelativeToBound(
            inverseTransformedLinePoints,
            inverseTransformedLineBound
          ),
        }
      );

      store.addElement(finalLineSnapshot);
      store.endUsingTool();
    };

    return (
      <Group onPointerDown={onPointerDown}>
        {/* always keep size to canvas viewport */}
        <ToolInteractionArea width={width} height={height} />
        {store.tempElement && <Element element={store.tempElement} />}
      </Group>
    );
  }
);
