import { computed } from "mobx";
import {
  model,
  Model,
  modelAction,
  ModelCreationData,
  prop,
  walkTree,
  WalkTreeMode,
} from "mobx-keystone";
import { nanoid } from "nanoid";

import { TOOL_MODE } from "@/lib/constants";
import { getZoomInScale, getZoomOutScale } from "@/lib/utils";

import { BindableDataModel } from "./bindable-data-model.new";
import { createElement } from "./helper.new";
import { NodeModel } from "./node-model.new";
import { Page } from "./page-model.new";
import { TChild } from "./types";

@model("Store")
export class Store extends Model({
  _activePageId: prop<string>(""),
  pages: prop<Page[]>(() => []),
  selectedElementsIds: prop<string[]>(() => []),
  bindableData: prop(() => new BindableDataModel({})),
  toolMode: prop<string>(TOOL_MODE.select),
  tempElement: prop<TChild | undefined>(undefined), // painting element
  // workspace related
  pageX: prop<number>(0),
  pageY: prop<number>(0),
  pageScale: prop<number>(1),
}) {
  @computed
  get activePage() {
    return (
      this.pages.find((page) => page.id === this._activePageId) || this.pages[0]
    );
  }

  getElementById(id: string) {
    return walkTree<TChild>(
      this.activePage,
      (_node) => {
        const node = _node as TChild;
        if (node.id === id) {
          return node;
        }
      },
      WalkTreeMode.ChildrenFirst
    );
  }

  @computed
  get selectedElements() {
    const result: TChild[] = [];

    walkTree(
      this.activePage,
      (_node) => {
        const node = _node as TChild;

        if (result.length === this.selectedElementsIds.length) {
          return result;
        }

        if (this.selectedElementsIds.includes(node.id)) {
          result.push(node);
        }
      },
      WalkTreeMode.ChildrenFirst
    );

    return result;
  }

  @modelAction
  selectPage(id: string) {
    this._activePageId = id;
  }

  @modelAction
  selectElements(ids: string[]) {
    const idsToSelect = ids
      .map((id) => this.getElementById(id))
      .filter((item): item is NodeModel => !!item)
      .sort(
        (a, b) =>
          this.activePage.children.indexOf(a) -
          this.activePage.children.indexOf(b)
      )
      .map((item) => item.id);

    this.selectedElementsIds = idsToSelect;
  }

  @modelAction
  unselectElements(ids: string[]) {
    this.selectedElementsIds = this.selectedElementsIds.filter(
      (id) => !ids.includes(id)
    );
  }

  @modelAction
  addPage(attrs: Omit<ModelCreationData<Page>, "id">) {
    const page = new Page({ ...attrs, id: nanoid(10) });

    this.pages.push(page);
    this.selectPage(page.id);
  }

  @modelAction
  removePage(id: string) {
    const index = this.pages.findIndex((page) => page.id === id);
    if (index >= 0) {
      this.pages.splice(index, 1);
    }
  }

  @modelAction
  addElement(attrs: Omit<ModelCreationData<TChild>, "id">) {
    const newElement = createElement(attrs);
    if (!newElement) return;

    this.activePage.children.push(newElement);
    this.selectElements([newElement.id]);
  }

  @modelAction
  setToolMode(mode: string) {
    this.toolMode = mode;
  }

  @modelAction
  resetToolMode() {
    this.toolMode = TOOL_MODE.select;
  }

  @modelAction
  setTempElement(attrs: ModelCreationData<TChild>) {
    this.tempElement = createElement(attrs);
  }

  @modelAction
  unsetTempElement() {
    this.tempElement = undefined;
  }

  @modelAction
  endUsingTool() {
    this.tempElement = undefined;
    this.toolMode = TOOL_MODE.select;
  }

  @modelAction
  setPagePosition(x: number, y: number) {
    this.pageX = x;
    this.pageY = y;
  }

  @modelAction
  setPageScale(scale: number) {
    this.pageScale = scale;
  }

  @modelAction
  zoomOut() {
    this.pageScale = getZoomOutScale(this.pageScale);
  }

  @modelAction
  zoomIn() {
    this.pageScale = getZoomInScale(this.pageScale);
  }
}

export function createStore() {
  return new Store({});
}
