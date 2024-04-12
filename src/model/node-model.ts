import { SnapshotIn, Instance, t, getParentOfType } from "mobx-state-tree";
import { Page } from "./page-model";

export const NodeModel = t
  .model("Node", {
    id: t.identifier,
    type: "none",
    name: "",
  })
  .views((self) => ({
    get page() {
      return getParentOfType(self, Page);
    },
  }))
  .actions((self) => ({
    set(data: SnapshotIn<typeof self>) {
      Object.assign(self, data);
    },
  }));

export interface INodeInstance extends Instance<typeof NodeModel> {}
export interface INodeSnapshotIn extends SnapshotIn<typeof NodeModel> {}
