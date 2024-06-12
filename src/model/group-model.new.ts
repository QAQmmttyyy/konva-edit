import { ExtendedModel, model, prop } from "mobx-keystone";

import { ELEMENT_TYPE } from "@/lib/constants";

import { NodeModel } from "./node-model.new";
import { TChildren } from "./types";

// 定义 GroupModel
@model("Group")
export class GroupModel extends ExtendedModel(NodeModel, {
  type: prop<string>(ELEMENT_TYPE.group),
  children: prop<TChildren>(() => []),
}) {}
