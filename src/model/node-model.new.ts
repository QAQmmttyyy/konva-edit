import { isEmpty, merge, omit, set } from "lodash";
import { computed } from "mobx";
import {
  clone,
  ExtendedModel,
  getRoot,
  model,
  Model,
  modelAction,
  ModelData,
  prop,
} from "mobx-keystone";

@model("StateData")
class StateData extends Model({
  name: prop<string>(""),
  bindings: prop<Record<string, string>>(() => ({})),
  x: prop<number>(0),
  y: prop<number>(0),
  width: prop<number>(0),
  height: prop<number>(0),
  rotation: prop<number>(0),
  stroke: prop<string>("#000000"),
  strokeWidth: prop<number>(2),
  points: prop<number[]>(() => []),
  src: prop<string>(""),
}) {}

// 定义 NodeModel
@model("Node")
export class NodeModel extends ExtendedModel(StateData, {
  id: prop<string>(),
  type: prop<string>(""),
  children: prop<NodeModel[]>(() => []),
  currentState: prop<string>(""),
  states: prop<Record<string, StateData>>(() => ({})),
}) {
  @computed
  get currentStateData() {
    return this.states[this.currentState] ?? this;
  }

  @computed
  get data(): typeof this {
    if (this.currentState === "" && isEmpty(this.bindings)) {
      return this;
    }

    const copy = merge({}, this, this.currentStateData);

    if (isEmpty(copy.bindings)) {
      return copy;
    }

    const bindableData = getRoot(this).bindableData;
    for (const [targetPath, sourcePath] of Object.entries(copy.bindings)) {
      set(copy, targetPath, bindableData.getPathValue(sourcePath));
    }
    return copy;
  }

  @modelAction
  setBindings(key: string, value: string) {
    const target = this.currentStateData;
    target.bindings[key] = value;
  }

  @modelAction
  unsetBindings(key: string) {
    const target = this.currentStateData;
    if (target.bindings) delete target.bindings[key];
  }

  @modelAction
  createState(name: string) {
    this.states[name] = clone(
      omit(this, "id", "states", "currentState", "type", "children")
    );
  }

  @modelAction
  setCurrentState(name: string) {
    this.currentState = name;
  }

  // 新增的动作方法，用于修改属性
  @modelAction
  updateProperty<K extends keyof ModelData<StateData>>(
    key: K,
    value: ModelData<StateData>[K]
  ) {
    const target = this.currentStateData;
    set(target, key, value);
  }

  // 新增的动作方法，用于批量更新属性
  @modelAction
  patch(data: Partial<ModelData<StateData>>) {
    const target = this.currentStateData;
    Object.assign(target, data);
  }
}
