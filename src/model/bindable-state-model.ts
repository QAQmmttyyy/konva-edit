import { get, set } from "lodash";
import { t, IAnyType, Instance } from "mobx-state-tree";

interface IBindableStateModelProperties {
  [key: string]: IAnyType;
}

export const BindableStateModel = t
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

export interface IBindableStateInstance
  extends Instance<typeof BindableStateModel> {}
