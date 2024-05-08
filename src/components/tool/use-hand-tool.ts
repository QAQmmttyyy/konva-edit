import { useRef } from "react";
import { KonvaNodeEvents } from "react-konva";

import { useStore } from "@/context/store-context";
import { MOUSE_BUTTON, TOOL_MODE } from "@/lib/constants";

export function useHandTool(): KonvaNodeEvents {
  const store = useStore();
  const isGrabbingRef = useRef(false);
  const startPointRef = useRef({ x: 0, y: 0 });

  const setPagePosition = (ev: PointerEvent) => {
    const { x, y } = startPointRef.current;
    const deltaX = ev.clientX - x;
    const deltaY = ev.clientY - y;
    startPointRef.current = { x: ev.clientX, y: ev.clientY };
    store.setPagePosition(store.pageX + deltaX, store.pageY + deltaY);
  };

  const onPointerMove = (ev: PointerEvent) => {
    if (!isGrabbingRef.current) {
      return;
    }
    setPagePosition(ev);
  };

  const onPointerUp = (ev: PointerEvent) => {
    if (!isGrabbingRef.current) {
      return;
    }

    setPagePosition(ev);

    isGrabbingRef.current = false;
    document.removeEventListener("pointermove", onPointerMove);
    document.removeEventListener("pointerup", onPointerUp);
  };

  return {
    onPointerDown(ev) {
      if (store.toolMode === TOOL_MODE.hand) {
        if (ev.evt.button === MOUSE_BUTTON.right) {
          return;
        }
      } else {
        if (ev.evt.button !== MOUSE_BUTTON.middle) {
          return;
        }
      }

      isGrabbingRef.current = true;
      startPointRef.current = { x: ev.evt.clientX, y: ev.evt.clientY };

      document.addEventListener("pointermove", onPointerMove);
      document.addEventListener("pointerup", onPointerUp);
    },
  };
}
