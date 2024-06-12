import { ExtendedModel, model, prop } from "mobx-keystone";

import { ELEMENT_TYPE } from "@/lib/constants";

import { NodeModel } from "./node-model.new";

@model("Image")
export class ImageModel extends ExtendedModel(NodeModel, {
  type: prop(ELEMENT_TYPE.image),
}) {}
