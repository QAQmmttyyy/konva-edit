import Konva from "konva";
import { observer } from "mobx-react-lite";
import { useLayoutEffect, useRef } from "react";
import { Layer, Stage } from "react-konva";
import { useStore } from "@/context/store-context";
import { ELEMENT_NODE_NAME } from "@/lib/constants";
import { DragEndEvent, useDndMonitor } from "@dnd-kit/core";
import { Droppable } from "../dnd/droppable";
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
          x: _activatorEvent.clientX + delta.x - over.rect.left,
          y: _activatorEvent.clientY + delta.y - over.rect.top,
        };

        store.addElement(
          Object.assign({}, active.data.current, pointerPositionInStage)
        );
      }
    },
  });

  return (
    <Droppable args={{ id: PAGE_DROPPABLE_ID }}>
      <Stage
        ref={stageRef}
        width={width}
        height={height}
        onPointerDown={(ev) => {
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
          {store?.activePage.children.map((child) => (
            <Element key={child.id} element={child} />
          ))}
          <Highlighter ref={highlighterRef} />
          <SelectionBox ref={selectionBoxRef} />
        </Layer>
      </Stage>
    </Droppable>
  );
});
