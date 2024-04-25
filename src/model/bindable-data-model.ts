import { get, set } from "lodash";
import { t, IAnyType, Instance } from "mobx-state-tree";

interface IBindableStateModelProperties {
  [key: string]: IAnyType;
}

export const BindableDataModel = t
  .model<IBindableStateModelProperties>("BindableDataSource")
  .views((self) => ({
    getPathValue(path: string) {
      return get(self, path);
    },
  }))
  .actions((self) => ({
    setPathValue(path: string, value: unknown) {
      set(self, path, value);
    },
  }));

export interface IBindableDataInstance
  extends Instance<typeof BindableDataModel> {}
