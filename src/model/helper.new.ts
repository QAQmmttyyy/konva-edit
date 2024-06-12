import { ModelCreationData } from "mobx-keystone";
import { nanoid } from "nanoid";

import { ELEMENT_TYPE } from "@/lib/constants";
import { ELEMENT_REGISTRY } from "@/lib/element-register";

import { TChild } from "./types";

export function createElement(attrs: Omit<ModelCreationData<TChild>, "id">) {
  const elementOptions = ELEMENT_REGISTRY[attrs.type as ELEMENT_TYPE];
  if (!elementOptions) {
    console.error("Can not find element registry info with type " + attrs.type);
    return;
  }

  const newElement = new elementOptions.model({ ...attrs, id: nanoid(10) });
  return newElement;
}
