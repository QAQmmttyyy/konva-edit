import { IAnyType, Instance, t } from "mobx-state-tree";
import { ELEMENT_TYPE } from "@/lib/constants";
import { NodeModel } from "./node-model";
import { ImageModel } from "./image-model";
import { LineModel } from "./line-model";

// when add new element model, you need add it to this union.
export const childrenType: IAnyType = t.union(
  t.late(() => GroupModel),
  ImageModel,
  LineModel
);

export const GroupModel = NodeModel.named("Group").props({
  type: ELEMENT_TYPE.group,
  children: t.array(childrenType),
});

export interface IGroupInstance extends Instance<typeof GroupModel> {}
