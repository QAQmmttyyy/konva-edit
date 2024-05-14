import { FC } from "react";

import { ToolInteractionArea } from "./tool-interaction-area";
import { IToolProps } from "./type";

interface IHandToolProps extends IToolProps {}

export const HandTool: FC<IHandToolProps> = ({ width, height }) => {
  return <ToolInteractionArea width={width} height={height} />;
};
