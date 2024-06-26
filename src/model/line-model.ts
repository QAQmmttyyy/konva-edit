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

export interface ILineInstance extends Instance<typeof LineModel> {}
export interface ILineSnapshotIn extends SnapshotIn<typeof LineModel> {}
