import Konva from "konva";
import { observer } from "mobx-react-lite";
import { getSnapshot } from "mobx-state-tree";
import { useRef } from "react";
import { Group } from "react-konva";

import { useStore } from "@/context/store-context";
import { ELEMENT_TYPE } from "@/lib/constants";
import {
  ILineInstance,
  ILineSnapshotIn,
  transformLinePointsToRelativeToSelfBound,
} from "@/model/line-model";

import { Element } from "../canvas/element";
import { getPointerPosition } from "./helper";
import { ToolInteractionArea } from "./tool-interaction-area";
import { IToolProps } from "./type";

interface ILinePaintToolProps extends IToolProps {}

export const LinePaintTool = observer<ILinePaintToolProps>(
  ({ width, height }) => {
    const isPaintingRef = useRef(false);
    const store = useStore();
    const { tempElement } = store;

    const onPointerDown = (ev: Konva.KonvaPointerEvent) => {
      ev.cancelBubble = true;
      console.log("paint d");

      isPaintingRef.current = true;
      store.selectElements([]);

      const pointerPosition = getPointerPosition(ev);

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
      console.log("paint m");

      if (!isPaintingRef.current) {
        return;
      }

      const pointerPosition = getPointerPosition(ev);
      const line = tempElement as ILineInstance;
      line.setPoints(1, pointerPosition);
    };

    const onPointerUp = (ev: Konva.KonvaPointerEvent) => {
      ev.cancelBubble = true;
      console.log("paint up");

      isPaintingRef.current = false;

      const lineSnapshot = getSnapshot(tempElement as ILineInstance);
      const lineNode = ev.target.getLayer()?.findOne(`#${lineSnapshot.id}`);
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
    };

    return (
      <Group
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        <ToolInteractionArea width={width} height={height} />
        {store.tempElement && <Element element={store.tempElement} />}
      </Group>
    );
  }
);
