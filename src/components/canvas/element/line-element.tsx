import { observer } from "mobx-react-lite";
import { Line } from "react-konva";

import { ELEMENT_NODE_NAME } from "@/lib/constants";
import { ILineInstance } from "@/model/line-model";

interface ILineElementProps {
  element: ILineInstance;
}

export const LineElement = observer<ILineElementProps>(({ element }) => {
  const { id, x, y, points, stroke, strokeWidth } =
    element.processedSelf as ILineInstance;

  // TODO line transformer
  return (
    <Line
      id={id}
      name={ELEMENT_NODE_NAME}
      x={x}
      y={y}
      // spread points to access member to enable mobx reactive
      points={[...points]}
      stroke={stroke}
      strokeWidth={strokeWidth}
      hitStrokeWidth={strokeWidth + 12}
      onDragEnd={(ev) => {
        const pos = ev.target.position();
        element.set({ ...pos });
      }}
      draggable
    />
  );
});
