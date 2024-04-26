import { merge, omit, set } from "lodash";
import {
  cast,
  getRoot,
  IAnyModelType,
  IAnyType,
  Instance,
  SnapshotIn,
  t,
  unprotect,
} from "mobx-state-tree";
import { IStoreInstance } from "./store";

const commonPropertiesDeclarationBetweenModelAndState = {
  // can not use type define sugar syntax
  name: t.optional(t.string, ""),
  /**
   * data bindings map: key is 'bind target', value is 'bind source'
   * @example { "name", "elements[0].name" };
   */
  bindings: t.maybe(t.map(t.string)),
};

export const NodeModel = t
  .model("Node", {
    id: t.identifier,
    type: "none",
    ...commonPropertiesDeclarationBetweenModelAndState,
    /**
     * element state, state data contains editable property of model instance.
     */
    currentState: "",
    states: t.optional(
      t.late(() => StatesModel),
      {}
    ),
  })
  .views((self) => ({
    get currentStateData() {
      return self.states[self.currentState];
    },
  }))
  .views((self) => ({
    get processedSelf() {
      if (!self.currentState && !self.bindings) {
        return self;
      }

      // merge state deeply
      const selfCopy = merge({}, self, self.currentStateData);

      console.log("self copy", selfCopy);
      if (!selfCopy.bindings) {
        return selfCopy;
      }

      // resolve bindings
      const bindableData = (getRoot(self) as IStoreInstance).bindableData;
      for (const [targetPath, sourcePath] of selfCopy.bindings.entries()) {
        set(selfCopy, targetPath, bindableData.getPathValue(sourcePath));
      }
      return selfCopy;
    },
  }))
  .actions((self) => ({
    set(data: SnapshotIn<IAnyModelType>) {
      const target = self.currentStateData ?? self;
      // state data can not has "currentState" "states" prop
      Object.assign(target, omit(data, ["currentState", "states"]));
    },
  }))
  .actions((self) => ({
    // bindings
    setBindings(key: string, value: string) {
      const target = self.currentStateData ?? self;
      if (!target.bindings) {
        target.bindings = cast({});
      }
      target.bindings?.set(key, value);
    },
    unsetBindings(key: string) {
      self.bindings?.delete(key);
    },

    // states
    createState(name: string) {
      const stateData = StateDataModel.create();
      unprotect(stateData);
      self.states[name] = stateData;
    },
    setCurrentState(name: string) {
      self.currentState = name;
    },
  }));

export interface INodeInstance extends Instance<typeof NodeModel> {}
export interface INodeSnapshotIn extends SnapshotIn<typeof NodeModel> {}

type IStateDataModelProperties =
  typeof commonPropertiesDeclarationBetweenModelAndState & {
    [key: string]: IAnyType;
  };
const StateDataModel = t.model<IStateDataModelProperties>("StateDataModel", {
  ...commonPropertiesDeclarationBetweenModelAndState,
});

interface IStatesModelProperties {
  [state: string]: typeof StateDataModel;
}
const StatesModel = t.model<IStatesModelProperties>("StatesModel");
