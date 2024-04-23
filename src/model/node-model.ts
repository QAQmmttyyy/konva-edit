import {
  t,
  SnapshotIn,
  Instance,
  IAnyModelType,
  getRoot,
} from "mobx-state-tree";
import { IStoreInstance } from "./store";
import { set } from "lodash";

export const NodeModel = t
  .model("Node", {
    id: t.identifier,
    type: "none",
    name: "",
    /**
     * data bindings map: key is 'bind target', value is 'bind source'
     * @example { "name", "elements[0].name" };
     */
    bindings: t.maybe(t.map(t.string)),
  })
  .views((self) => ({
    get processedSelf() {
      if (!self.bindings) {
        return self;
      }

      const state = (getRoot(self) as IStoreInstance).bindableState;
      const selfCopy = { ...self };
      for (const [targetPath, sourcePath] of self.bindings.entries()) {
        set(selfCopy, targetPath, state.getPathValue(sourcePath));
      }
      return selfCopy;
    },
  }))
  .actions((self) => ({
    set(data: SnapshotIn<IAnyModelType>) {
      Object.assign(self, data);
    },
  }))
  .actions((self) => ({
    setBindings(key: string, value: string) {
      if (!self.bindings) {
        self.set({ bindings: {} });
      }
      self.bindings?.set(key, value);
    },
    unsetBindings(key: string) {
      self.bindings?.delete(key);
    },
  }));

export interface INodeInstance extends Instance<typeof NodeModel> {}
export interface INodeSnapshotIn extends SnapshotIn<typeof NodeModel> {}
