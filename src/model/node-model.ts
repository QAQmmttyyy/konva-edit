import { t, SnapshotIn, Instance, IAnyModelType } from "mobx-state-tree";

export const NodeModel = t
  .model("Node", {
    id: t.identifier,
    type: "none",
    name: "",
  })
  .actions((self) => ({
    set(data: SnapshotIn<IAnyModelType>) {
      Object.assign(self, data);
    },
  }));

export interface INodeInstance extends Instance<typeof NodeModel> {}
export interface INodeSnapshotIn extends SnapshotIn<typeof NodeModel> {}
