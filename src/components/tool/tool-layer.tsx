import { observer } from "mobx-react-lite";
import { FC } from "react";
import { Layer } from "react-konva";

import { useStore } from "@/context/store-context";
import { TOOL_MODE } from "@/lib/constants";

import { HandTool } from "./hand-tool";
import { LinePaintTool } from "./line-paint-tool";
import { IToolProps } from "./type";

interface IToolLayerProps {
  width: number;
  height: number;
}

export const ToolLayer = observer<IToolLayerProps>(({ width, height }) => {
  const store = useStore();
  const { toolMode } = store;

  const enabled = toolMode !== TOOL_MODE.select;
  const ToolUI = TOOL_MAP[toolMode];

  return (
    <Layer id="tool-layer" visible={enabled}>
      {/* layer can not trigger event */}
      {ToolUI && <ToolUI width={width} height={height} />}
    </Layer>
  );
});

const TOOL_MAP: Record<string, FC<IToolProps>> = {
  [TOOL_MODE.hand]: HandTool,
  [TOOL_MODE.line]: LinePaintTool,
};
