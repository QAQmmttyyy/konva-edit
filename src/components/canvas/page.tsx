import Konva from "konva";
import { useRef } from "react";
import { Layer, Stage } from "react-konva";
import { useStore } from "@/context/store-context";
import { DragEndEvent, useDndMonitor } from "@dnd-kit/core";
import { Droppable } from "../dnd/droppable";
import { Element } from "./element";
import { observer } from "mobx-react-lite";

interface IPageProps {
  width: number;
  height: number;
}

const PAGE_DROPPABLE_ID = "page-drop-area";

export const Page = observer<IPageProps>(({ width, height }) => {
  const store = useStore();

  const stageRef = useRef<Konva.Stage>(null);

  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      const { activatorEvent, active, over, delta } = event;
      const _activatorEvent = activatorEvent as PointerEvent;

      _activatorEvent.preventDefault();

      if (over?.id === PAGE_DROPPABLE_ID) {
        console.log("active element data", active.data.current);

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
      <Stage ref={stageRef} width={width} height={height}>
        <Layer>
          {store?.activePage.children.map((child) => (
            <Element key={child.id} element={child} />
          ))}
        </Layer>
      </Stage>
    </Droppable>
  );
});
