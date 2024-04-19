import { IAnyType, Instance, t } from "mobx-state-tree";
import { NodeModel } from "./node-model";
import { ImageModel } from "./image-model";

// when add new element model, you need add it to this union.
export const childrenType: IAnyType = t.union(
  t.late(() => GroupModel),
  ImageModel
);

export const GroupModel = NodeModel.named("Group").props({
  type: "group",
  children: t.array(childrenType),
});

export interface IGroupInstance extends Instance<typeof GroupModel> {}
