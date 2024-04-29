import Konva from "konva";
import { observer } from "mobx-react-lite";
import { getSnapshot } from "mobx-state-tree";
import { useRef } from "react";

import { useStore } from "@/context/store-context";
import { ELEMENT_TYPE } from "@/lib/constants";
import {
  ILineInstance,
  ILineSnapshot,
  transformLinePointsToRelativeToSelfBound,
} from "@/model/line-model";

import { Element } from "../canvas/element";
import { getPointerPosition } from "./helper";
import { TUseToolHook } from "./type";

export function useLinePaintTool(): ReturnType<TUseToolHook> {
  const isPaintingRef = useRef(false);
  const store = useStore();
  const { tempElement } = store;

  const onPointerDown = (ev: Konva.KonvaPointerEvent) => {
    ev.cancelBubble = true;
    console.log("paint d");

    isPaintingRef.current = true;
    store.selectElements([]);

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

  return { onPointerDown, onPointerMove, onPointerUp, ToolUI: linePaintToolUI };
}

const linePaintToolUI = observer(() => {
  const store = useStore();
  return store.tempElement && <Element element={store.tempElement} />;
});