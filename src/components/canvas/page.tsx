import Konva from "konva";
import { observer } from "mobx-react-lite";
import { useLayoutEffect, useRef } from "react";
import { Layer, Stage } from "react-konva";

import { useStore } from "@/context/store-context";
import { TOOL_MODE } from "@/lib/constants";
import { DragEndEvent, useDndMonitor } from "@dnd-kit/core";

import { Droppable } from "../dnd/droppable";
import {
  bindToolEventHandlers,
  getInverseTransformedPoint,
} from "../tool/helper";
import { ToolLayer } from "../tool/tool-layer";
import { useHandTool } from "../tool/use-hand-tool";
import { useSelectTool } from "../tool/use-select-tool";
import { useWheelScrollTool } from "../tool/use-wheel-scroll-tool";
import { useWheelZoomTool } from "../tool/use-wheel-zoom-tool";
import { Element } from "./element";
import { Highlighter, IHighlighterRef } from "./highlighter";
import { ISelectionBoxRef, SelectionBox } from "./selection-box";

interface IPageProps {
  width: number;
  height: number;
}

const PAGE_DROPPABLE_ID = "page-drop-area";

export const Page = observer<IPageProps>(({ width, height }) => {
  const store = useStore();
  const stageRef = useRef<Konva.Stage>(null);
  const selectionBoxRef = useRef<ISelectionBoxRef>(null);
  const highlighterRef = useRef<IHighlighterRef>(null);

  const { pageX, pageY, pageScale } = store;

  // selection box
  // Note: must attach nodes to konva transformer node here.
  const selectedIds = store.selectedElementsIds.toJSON();
  useLayoutEffect(() => {
    selectionBoxRef.current?.nodes(selectedIds);
    highlighterRef.current?.hide();
  }, [selectedIds]);

  useDndMonitor({
    // drop to create element
    onDragEnd: (event: DragEndEvent) => {
      const { activatorEvent, active, over, delta } = event;
      const _activatorEvent = activatorEvent as PointerEvent;

      _activatorEvent.preventDefault();

      if (over?.id === PAGE_DROPPABLE_ID) {
        const pointerPositionInStage = getInverseTransformedPoint(
          {
            x: _activatorEvent.clientX + delta.x - over.rect.left,
            y: _activatorEvent.clientY + delta.y - over.rect.top,
          },
          {
            translation: { x: pageX, y: pageY },
            scale: { x: pageScale, y: pageScale },
          }
        );

        store.addElement(
          Object.assign({}, active.data.current, pointerPositionInStage)
        );
      }
    },
  });

  // this way can bind multiple handler on same event type.
  const selectToolHandlers = useSelectTool();
  const handToolHandlers = useHandTool();
  const wheelScrollHandlers = useWheelScrollTool();
  const wheelZoomHandlers = useWheelZoomTool();
  useLayoutEffect(() => {
    if (!stageRef.current) {
      return;
    }

    const unbindSelectToolHandlers = bindToolEventHandlers(
      stageRef.current,
      selectToolHandlers
    );
    const unbindHandToolHandlers = bindToolEventHandlers(
      stageRef.current,
      handToolHandlers
    );
    const unbindWheelScrollHandlers = bindToolEventHandlers(
      stageRef.current,
      wheelScrollHandlers
    );
    const unbindWheelZoomHandlers = bindToolEventHandlers(
      stageRef.current,
      wheelZoomHandlers
    );

    return () => {
      unbindSelectToolHandlers();
      unbindHandToolHandlers();
      unbindWheelScrollHandlers();
      unbindWheelZoomHandlers();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Droppable args={{ id: PAGE_DROPPABLE_ID }}>
      <Stage
        ref={stageRef}
        id="stage"
        width={width}
        height={height}
        onPointerMove={(ev) => {
          highlighterRef.current?.highlight(ev);
        }}
      >
        <Layer
          x={pageX}
          y={pageY}
          scaleX={pageScale}
          scaleY={pageScale}
          listening={store.toolMode === TOOL_MODE.select}
        >
          {store.activePage.children.map((child) => (
            <Element key={child.id} element={child} />
          ))}
          <Highlighter ref={highlighterRef} />
          <SelectionBox ref={selectionBoxRef} />
        </Layer>
        <ToolLayer width={width} height={height} />
      </Stage>
    </Droppable>
  );
});
