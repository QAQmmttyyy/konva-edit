import Konva from "konva";
import { observer } from "mobx-react-lite";
import { useLayoutEffect, useRef } from "react";
import { Layer, Stage } from "react-konva";

import { useStore } from "@/context/store-context";
import { ELEMENT_NODE_NAME, MOUSE_BUTTON } from "@/lib/constants";
import { DragEndEvent, useDndMonitor } from "@dnd-kit/core";

import { Droppable } from "../dnd/droppable";
import { bindToolEventHandlers } from "../tool/helper";
import { ToolLayer } from "../tool/tool-layer";
import { useHandTool } from "../tool/use-hand-tool";
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

  const { pageX, pageY } = store;

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
        const pointerPositionInStage = {
          x: _activatorEvent.clientX + delta.x - over.rect.left - pageX,
          y: _activatorEvent.clientY + delta.y - over.rect.top - pageY,
        };

        store.addElement(
          Object.assign({}, active.data.current, pointerPositionInStage)
        );
      }
    },
  });

  // this way can bind multiple handler on same event type.
  const handToolHandlers = useHandTool();
  useLayoutEffect(() => {
    if (!stageRef.current) {
      return;
    }

    bindToolEventHandlers(stageRef.current!, handToolHandlers);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Droppable args={{ id: PAGE_DROPPABLE_ID }}>
      <Stage
        ref={stageRef}
        id="stage"
        x={pageX}
        y={pageY}
        width={width}
        height={height}
        onWheel={(ev) => {
          ev.evt.preventDefault();
          // wheel to change position, and only wheel to change y, shift + wheel to change x
          const delta = -Math.round(ev.evt.deltaY);
          const shiftKey = ev.evt.shiftKey;
          const newX = shiftKey ? pageX + delta : pageX;
          const newY = shiftKey ? pageY : pageY + delta;
          store.setPagePosition(newX, newY);
        }}
        onPointerDown={(ev) => {
          // wheel press down
          if (ev.evt.button === MOUSE_BUTTON.middle) {
            console.log("wheel press down");
            return;
          }

          // if click on empty area - remove all selections
          if (
            ev.target === ev.target.getStage() &&
            store.selectedElementsIds.length > 0
          ) {
            store.selectElements([]);
            return;
          }

          // do nothing if clicked NOT on our rectangles
          if (!ev.target.hasName(ELEMENT_NODE_NAME)) {
            return;
          }

          // do we pressed shift or ctrl?
          const shiftPressed = ev.evt.shiftKey;
          const isSelected = store.selectedElementsIds.includes(ev.target.id());

          if (!shiftPressed && !isSelected) {
            // if no key pressed and the node is not selected
            // select just one
            store.selectElements([ev.target.id()]);
          } else if (shiftPressed && isSelected) {
            // if we pressed keys and node was selected
            // we need to remove it from selection:
            store.unselectElements([ev.target.id()]);
          } else if (shiftPressed && !isSelected) {
            // add the node into selection
            store.selectElements([
              ...store.selectedElementsIds,
              ev.target.id(),
            ]);
          }
        }}
        onPointerMove={(ev) => {
          highlighterRef.current?.highlight(ev);
        }}
      >
        <Layer>
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
