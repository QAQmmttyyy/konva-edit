import { KonvaNodeEvents } from "react-konva";

import { useStore } from "@/context/store-context";
import { getZoomInScale, getZoomOutScale } from "@/lib/utils";

export function useWheelZoomTool(): KonvaNodeEvents {
  const store = useStore();
  return {
    onWheel(ev) {
      if (!ev.evt.ctrlKey) return;

      ev.evt.preventDefault();

      const stage = ev.target.getStage();

      const oldScale = store.pageScale;
      const pointer = stage?.getPointerPosition() ?? {
        x: ev.evt.offsetX,
        y: ev.evt.offsetY,
      };
      const mousePointToStage = {
        x: (pointer.x - store.pageX) / oldScale,
        y: (pointer.y - store.pageY) / oldScale,
      };

      const direction = -ev.evt.deltaY > 0 ? 1 : -1;
      const newScale =
        direction > 0 ? getZoomInScale(oldScale) : getZoomOutScale(oldScale);
      const newPos = {
        x: pointer.x - mousePointToStage.x * newScale,
        y: pointer.y - mousePointToStage.y * newScale,
      };

      store.setPageScale(newScale);
      store.setPagePosition(newPos.x, newPos.y);
    },
  };
}
