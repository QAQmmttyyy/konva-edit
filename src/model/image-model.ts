import { Instance, SnapshotIn } from "mobx-state-tree";
import { ELEMENT_TYPE } from "@/lib/constants";
import { ShapeModel } from "./shape-model";

export const ImageModel = ShapeModel.named("Image").props({
  type: ELEMENT_TYPE.image,
  src: "",
});

export interface IImageInstance extends Instance<typeof ImageModel> {}
export interface IImageSnapshotIn extends SnapshotIn<typeof ImageModel> {}
