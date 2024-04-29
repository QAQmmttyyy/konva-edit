import { FC } from "react";
import { KonvaNodeEvents } from "react-konva";

export type TUseToolHook = () => KonvaNodeEvents & { ToolUI: FC }