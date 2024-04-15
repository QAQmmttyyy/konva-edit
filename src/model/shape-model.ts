import { Instance } from "mobx-state-tree";
import { NodeModel } from "./node-model";

export const ShapeModel = NodeModel.named("Shape").props({
  x: 0,
  y: 0,
  width: 0,
  height: 0,
});

export interface IShapeInstance extends Instance<typeof ShapeModel> {}
