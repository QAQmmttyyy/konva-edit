import Konva from "konva";
import { observer } from "mobx-react-lite";
import { getSnapshot } from "mobx-state-tree";
import { useRef } from "react";
import { Group } from "react-konva";

import { useStore } from "@/context/store-context";
import { ELEMENT_TYPE } from "@/lib/constants";
import { ILineInstance, ILineSnapshotIn } from "@/model/line-model";

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
    const { tempElement, pageX, pageY, pageScale } = store;

    const onPointerDown = (ev: Konva.KonvaPointerEvent) => {
      ev.cancelBubble = true;
      isPaintingRef.current = true;
      store.selectElements([]);

      const pointerPosition = getRelativePointerPositionInLayer(ev);

      const lineAttrs: ILineSnapshotIn = {
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

    const onPointerMove = (ev: Konva.KonvaPointerEvent) => {
      ev.cancelBubble = true;

      if (!isPaintingRef.current) {
        return;
      }

      const pointerPosition = getRelativePointerPositionInLayer(ev);
      const line = tempElement as ILineInstance;
      line.setPoints(1, pointerPosition);
    };

    const onPointerUp = (ev: Konva.KonvaPointerEvent) => {
      ev.cancelBubble = true;
      isPaintingRef.current = false;

      const lineNode = ev.target.getLayer()?.findOne(`#${tempElement.id}`);

      if (lineNode) {
        const lineBound = lineNode.getClientRect({
          relativeTo: ev.target.getLayer() || undefined,
        });
        const lineSnapshot = Object.assign(
          {},
          getSnapshot(tempElement as ILineInstance),
          lineBound
        );

        const inverseTransformedLineBound = {
          x: (lineBound.x - pageX) / pageScale,
          y: (lineBound.y - pageY) / pageScale,
          width: lineBound.width / pageScale,
          height: lineBound.height / pageScale,
        };
        const inverseTransformedLinePoints = getInverseTransformedLinePoints(
          lineSnapshot.points,
          {
            translation: { x: pageX, y: pageY },
            scale: { x: pageScale, y: pageScale },
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
      } else {
        console.warn("[EMS] Line node is not found, id: ", tempElement.id);
      }

      store.endUsingTool();
    };

    return (
      <Group
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        {/* always keep size to canvas viewport */}
        <ToolInteractionArea width={width} height={height} />
        {store.tempElement && <Element element={store.tempElement} />}
      </Group>
    );
  }
);
