import { KonvaNodeEvents } from "react-konva";

import { useStore } from "@/context/store-context";
import { ELEMENT_NODE_NAME, MOUSE_BUTTON } from "@/lib/constants";

export function useSelectTool(): KonvaNodeEvents {
  const store = useStore();
  const selectButtons = [MOUSE_BUTTON.left, MOUSE_BUTTON.right];
  return {
    onPointerDown(ev) {
      if (!selectButtons.includes(ev.evt.button)) {
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

      // do nothing if clicked NOT on our element
      if (!ev.target.hasName(ELEMENT_NODE_NAME)) {
        return;
      }

      const shiftPressed = ev.evt.shiftKey;
      const isSelected = store.selectedElementsIds.includes(ev.target.id());

      if (!shiftPressed && !isSelected) {
        // if no key pressed and the node is not selected, select just one
        store.selectElements([ev.target.id()]);
      } else if (shiftPressed && ev.evt.button === MOUSE_BUTTON.left) {
        isSelected
          ? store.unselectElements([ev.target.id()])
          : store.selectElements([
              ...store.selectedElementsIds,
              ev.target.id(),
            ]);
      }
    },
  };
}
