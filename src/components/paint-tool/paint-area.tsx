import Konva from "konva";
import { observer } from "mobx-react-lite";
import { getSnapshot } from "mobx-state-tree";
import { useRef } from "react";
import { Layer, Rect } from "react-konva";

import { useStore } from "@/context/store-context";
import { ELEMENT_TYPE, TOOL_MODE } from "@/lib/constants";
import {
  ILineInstance,
  ILineSnapshot,
  transformLinePointsToRelativeToSelfBound,
} from "@/model/line-model";

import { Element } from "../canvas/element";

interface IPaintAreaProps {
  width: number;
  height: number;
}

export const PaintArea = observer<IPaintAreaProps>(({ width, height }) => {
  const isPaintingRef = useRef(false);
  const store = useStore();
  const { toolMode, tempElement } = store;

  const enabled = toolMode !== TOOL_MODE.select;

  return (
    <Layer visible={enabled}>
      {/* layer can not trigger event */}
      <Rect
        id="paint-area"
        x={0}
        y={0}
        width={width}
        height={height}
        onPointerDown={(ev) => {
          ev.cancelBubble = true;
          console.log("paint d");

          isPaintingRef.current = true;
          store.selectElements([]);

          if (toolMode === TOOL_MODE.line) {
            const pointerPosition = getPointerPosition(ev);

            const lineAttrs: ILineSnapshot = {
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
          }
        }}
        onPointerMove={(ev) => {
          ev.cancelBubble = true;
          console.log("paint m");

          if (!isPaintingRef.current) {
            return;
          }

          if (toolMode === TOOL_MODE.line) {
            const pointerPosition = getPointerPosition(ev);
            const line = tempElement as ILineInstance;
            line.setPoints(1, pointerPosition);
          }
        }}
        onPointerUp={(ev) => {
          ev.cancelBubble = true;
          console.log("paint up");

          isPaintingRef.current = false;

          if (toolMode === TOOL_MODE.line) {
            const lineSnapshot = getSnapshot(tempElement as ILineInstance);
            const lineNode = ev.target
              .getLayer()
              ?.findOne(`#${lineSnapshot.id}`);
            const lineBound = lineNode?.getClientRect();

            store.addElement({
              ...lineSnapshot,
              ...lineBound,
              // now the points is relative to stage's left-top corner,
              // we need to transform it to relative line's self bound's left-top corner.
              points: transformLinePointsToRelativeToSelfBound(
                lineSnapshot.points,
                lineNode?.getClientRect()
              ),
            });
            store.endUsingTool();
          }
        }}
      />
      {tempElement && <Element element={tempElement} />}
    </Layer>
  );
});

function getPointerPosition(ev: Konva.KonvaEventObject<PointerEvent>) {
  return (
    ev.target.getStage()?.getPointerPosition() ?? {
      x: ev.evt.clientX,
      y: ev.evt.clientY,
    }
  );
}
