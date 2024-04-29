import { observer } from "mobx-react-lite";
import { Layer, Rect } from "react-konva";

import { useStore } from "@/context/store-context";
import { TOOL_MODE } from "@/lib/constants";

import { useLinePaintTool } from "./use-line-paint-tool";

interface IToolAreaProps {
  width: number;
  height: number;
}

export const ToolArea = observer<IToolAreaProps>(({ width, height }) => {
  const store = useStore();
  const { toolMode } = store;

  const { ToolUI, ...toolEventHandlers } = useLinePaintTool();

  const enabled = toolMode !== TOOL_MODE.select;

  return (
    <Layer id="tool-area-layer" visible={enabled}>
      {/* layer can not trigger event */}
      <Rect
        id="tool-area"
        x={0}
        y={0}
        width={width}
        height={height}
        {...toolEventHandlers}
      />
      <ToolUI />
    </Layer>
  );
});
