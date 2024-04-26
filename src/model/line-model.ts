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
    addPoints(x: number, y: number) {
      self.points.push(x, y);
    },
    updatePoints(index: number, x: number, y: number) {
      // self.points.splice(index * 2, 2, x, y);
      self.points[index * 2] = x;
      self.points[index * 2 + 1] = y;
    },
  }));

export interface ILineInstance extends Instance<typeof LineModel> {}
export interface ILineSnapshot extends SnapshotIn<typeof LineModel> {}
