import { IRect } from "konva/lib/types";
import { Instance, SnapshotIn, t } from "mobx-state-tree";

import { ELEMENT_TYPE } from "@/lib/constants";

import { ShapeModel } from "./shape-model";

export const LineModel = ShapeModel.named("Line")
  .props({
    type: ELEMENT_TYPE.line,
    name: "Line",
    points: t.array(t.number),
    stroke: "#000000",
    strokeWidth: 2,
  })
  .actions((self) => ({
    setPoints(index: number, point: { x: number; y: number }) {
      const target = self.currentData;
      if (!target.points) {
        target.points = [...self.points];
      }

      return target.points.splice(index * 2, 2, point.x, point.y);
    },
  }));

export function transformLinePointsToRelativeToSelfBound(
  source: number[],
  selfBound: IRect = { x: 0, y: 0, width: 0, height: 0 }
) {
  const points = [...source];
  for (let i = 0; i < points.length; i += 2) {
    points[i] = points[i] - selfBound.x;
    points[i + 1] = points[i + 1] - selfBound.y;
  }
  return points;
}

export interface ILineInstance extends Instance<typeof LineModel> {}
export interface ILineSnapshot extends SnapshotIn<typeof LineModel> {}
