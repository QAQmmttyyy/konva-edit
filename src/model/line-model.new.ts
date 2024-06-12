import { ExtendedModel, model, modelAction, prop } from "mobx-keystone";

import { ELEMENT_TYPE } from "@/lib/constants";

import { NodeModel } from "./node-model.new";

@model("Line")
export class LineModel extends ExtendedModel(NodeModel, {
  type: prop(ELEMENT_TYPE.line),
  name: prop("Line"),
}) {
  @modelAction
  setPoints(index: number, point: { x: number; y: number }) {
    const target = this.currentStateData;
    target.points.splice(index * 2, 2, point.x, point.y);
  }
}
