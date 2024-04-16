import { Instance, SnapshotIn } from "mobx-state-tree";
import { ShapeModel } from "./shape-model";

export const ImageModel = ShapeModel.named("Image").props({
  type: "image",
  src: "",
});

export interface IImageInstance extends Instance<typeof ImageModel> {}
export interface IImageSnapshotIn extends SnapshotIn<typeof ImageModel> {}