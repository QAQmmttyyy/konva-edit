import { KonvaNodeEvents } from "react-konva";

import { useStore } from "@/context/store-context";
import { SCROLL_STEP } from "@/lib/constants";

export function useWheelScrollTool(): KonvaNodeEvents {
  const store = useStore();
  return {
    onWheel(ev) {
      if (ev.evt.ctrlKey) return;

      ev.evt.preventDefault();

      // clamp delta to prevent scrolling too fast
      const deltaX = Math.max(
        Math.min(
          ev.evt.shiftKey ? ev.evt.deltaX || ev.evt.deltaY : ev.evt.deltaX,
          SCROLL_STEP
        ),
        -SCROLL_STEP
      );
      const deltaY = Math.max(
        Math.min(ev.evt.shiftKey ? 0 : ev.evt.deltaY, SCROLL_STEP),
        -SCROLL_STEP
      );

      const { pageX, pageY } = store;

      const newX = pageX - deltaX;
      const newY = pageY - deltaY;

      store.setPagePosition(newX, newY);
    },
  };
}
