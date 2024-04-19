import { Instance, t, SnapshotIn } from "mobx-state-tree";
import { childrenType } from "./group-model";

export const Page = t.model("Page", {
  id: t.identifier,
  children: t.array(childrenType),
});

export interface IPageInstance extends Instance<typeof Page> {}
export interface IPageSnapshotIn extends SnapshotIn<typeof Page> {}
