import { observer } from "mobx-react-lite";

import { useStore } from "@/context/store-context";

import { ToolInteractionArea } from "./tool-interaction-area";
import { IToolProps } from "./type";

interface IHandToolProps extends IToolProps {}

export const HandTool = observer<IHandToolProps>(
  ({ width, height }) => {
    const store = useStore();
    const { pageX, pageY } = store;

    return (
      <ToolInteractionArea
        x={-pageX}
        y={-pageY}
        width={width}
        height={height}
      />
    );
  }
);
