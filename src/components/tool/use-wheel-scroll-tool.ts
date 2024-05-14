import { KonvaNodeEvents } from "react-konva";

import { useStore } from "@/context/store-context";
import { SCROLL_STEP } from "@/lib/constants";

export function useWheelScrollTool(): KonvaNodeEvents {
  const store = useStore();
  return {
    onWheel(ev) {
      if (ev.evt.ctrlKey) return;

      ev.evt.preventDefault();

      // wheel to change position, and only wheel to change y, shift + wheel to change x
      const delta = -ev.evt.deltaY > 0 ? SCROLL_STEP : -SCROLL_STEP;
      const shiftKey = ev.evt.shiftKey;
      const { pageX, pageY } = store;

      const newX = shiftKey ? pageX + delta : pageX;
      const newY = shiftKey ? pageY : pageY + delta;

      store.setPagePosition(newX, newY);
    },
  };
}
