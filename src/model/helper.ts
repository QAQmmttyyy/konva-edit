import { IAnyModelType, IAnyStateTreeNode, SnapshotIn } from "mobx-state-tree";
import { nanoid } from "nanoid";

import { ELEMENT_TYPE } from "@/lib/constants";
import { ELEMENT_REGISTRY } from "@/lib/element-register";

export function forEveryChild(
  node: IAnyStateTreeNode,
  cb: (node: IAnyStateTreeNode) => boolean
) {
  if (node.children)
    for (const childNode of node.children) {
      if (cb(childNode)) break;
      forEveryChild(childNode, cb);
    }
}

export function createElement(attrs: SnapshotIn<IAnyModelType>) {
  const elementOptions = ELEMENT_REGISTRY[attrs.type as ELEMENT_TYPE];
  if (!elementOptions) {
    console.error("Can not find element registry info with type " + attrs.type);
    return;
  }

  const newElement = elementOptions.mstModel.create(
    Object.assign({}, attrs, { id: nanoid(10) })
  );
  return newElement;
}
