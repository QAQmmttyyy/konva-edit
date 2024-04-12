import {
  t,
  IAnyModelType,
  SnapshotOrInstance,
  IAnyType,
  Instance,
} from "mobx-state-tree";
import { NodeModel } from "./node-model";
import { ImageModel } from "./image-model";

export const ElementModelTypes: IAnyType = t.union(
  {
    dispatcher: (e: SnapshotOrInstance<typeof NodeModel>) => {
      const t = MODEL_TYPES_MAP[e.type!];
      if (!t) throw new Error(`Unknown element type: "${e.type}"`);
      return t;
    },
  },
  t.late(() => GroupModel),
  ImageModel
);

export const GroupModel = NodeModel.named("Group").props({
  type: "group",
  children: t.array(ElementModelTypes),
});

export const MODEL_TYPES_MAP: Record<string, IAnyModelType> = {
  group: GroupModel,
  image: ImageModel,
};

export interface IGroupInstance extends Instance<typeof GroupModel> {}
