import {
  cast,
  IAnyModelType,
  IAnyStateTreeNode,
  Instance,
  SnapshotIn,
  t,
} from "mobx-state-tree";
import { nanoid } from "nanoid";
import { ELEMENT_REGISTRY } from "@/lib/element-register";
import { ELEMENT_TYPE } from "@/lib/constants";
import { BindableDataModel } from "./bindable-data-model";
import { INodeInstance } from "./node-model";
import { IPageSnapshotIn, Page } from "./page-model";
import { forEveryChild } from "./utils";

export const Store = t
  .model("Store", {
    _activePageId: "",
    pages: t.array(Page),
    selectedElementsIds: t.array(t.string),
    bindableData: t.optional(BindableDataModel, {}),
  })
  .views((self) => ({
    get activePage() {
      return (
        self.pages.find((page) => page.id === self._activePageId) ||
        self.pages[0]
      );
    },
  }))
  .views((self) => ({
    find(
      callback: (node: IAnyStateTreeNode) => boolean
    ): INodeInstance | undefined {
      let result: INodeInstance | undefined;
      forEveryChild({ children: self.activePage.children }, (node) => {
        if (!result && callback(node)) {
          result = node;
          return true;
        }
        return false;
      });

      return result;
    },
  }))
  .views((self) => ({
    getElementById: (id: string) =>
      self.find((node: INodeInstance) => node.id === id),

    get selectedElements() {
      const result: INodeInstance[] = [];
      forEveryChild({ children: self.activePage.children }, (node) => {
        if (result.length === self.selectedElementsIds.length) {
          return true;
        }

        if (self.selectedElementsIds.includes(node.id)) {
          result.push(node);
        }
        return false;
      });

      return result;
    },
  }))
  .actions((self) => ({
    selectPage(id: string) {
      self._activePageId = id;
    },
    selectElements(ids: string[]) {
      const idsToSelect = ids
        .map((id) => self.getElementById(id))
        .filter((item): item is INodeInstance => !!item)
        .sort(
          (a, b) =>
            self.activePage.children.indexOf(a) -
            self.activePage.children.indexOf(b)
        )
        .map((item) => item.id);

      self.selectedElementsIds = cast(idsToSelect);
    },
    unselectElements(ids: string[]) {
      self.selectedElementsIds = cast(
        self.selectedElementsIds.filter((id) => !ids.includes(id))
      );
    },
  }))
  .actions((self) => ({
    addPage(attrs?: IPageSnapshotIn) {
      const page = Page.create(Object.assign({ id: nanoid(10) }, attrs));

      self.pages.push(page);
      self.selectPage(page.id);
    },
    removePage(id: string) {
      const index = self.pages.findIndex((page) => page.id === id);
      if (index >= 0) {
        self.pages.splice(index, 1);
      }
    },
    addElement(attrs: SnapshotIn<IAnyModelType>) {
      const elementOptions = ELEMENT_REGISTRY[attrs.type as ELEMENT_TYPE];
      if (!elementOptions) {
        console.error(
          "Can not find element registry info with type " + attrs.type
        );
        return;
      }

      const newElement = elementOptions.mstModel.create(
        Object.assign({}, attrs, { id: nanoid(10) })
      );

      self.activePage.children.push(newElement);
      self.selectElements([newElement.id]);
    },
  }));

export function createStore() {
  return Store.create();
}

export interface IStoreInstance extends Instance<typeof Store> {}
