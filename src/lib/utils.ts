import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { IAnyStateTreeNode } from "mobx-state-tree";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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
