import { get, set } from "lodash";
import { model, Model, modelAction } from "mobx-keystone";

@model("BindableDataSource")
export class BindableDataModel extends Model({}) {
  getPathValue(path: string) {
    return get(this, path);
  }

  // Action to set value in dynamic properties using a path
  @modelAction
  setPathValue(path: string, value: unknown) {
    set(this, path, value);
  }
}
