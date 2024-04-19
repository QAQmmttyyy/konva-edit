import { FC } from "react";
import { IAnyModelType } from "mobx-state-tree";
import {
  ElementComponentType,
  GroupElement,
} from "@/components/canvas/element";
import { ImageElement } from "@/components/canvas/element/image-element";
import { GroupModel } from "@/model/group-model";
import { ImageModel } from "@/model/image-model";
import { ELEMENT_TYPE, INPUT_TYPE } from "./constants";

export interface InputOptions {
  /** This is the name of the mst-model prop this input represents */
  propName: string;
  /**
   * The type of input to use, such as 'text'
   *
   * See all available inputs [here](https://www.builder.io/c/docs/custom-components-input-types)
   * and you can create your own custom input types and associated editor UIs with [plugins](https://www.builder.io/c/docs/extending/plugins)
   */
  type: INPUT_TYPE;

  /** A friendlier name to show in the UI if the component prop name is not ideal for end users */
  friendlyName?: string;
  /**
   * Additional text to render in the UI to give guidance on how to use this
   *
   * @example
   * ```js
   * helperText: 'Be sure to use a proper URL, starting with "https://"'
   * ```
   */
  helperText?: string;
  /**
   * Number field type validation maximum accepted input
   */
  max?: number;
  /**
   * Number field type validation minimum accepted input
   */
  min?: number;
  normalize?: (value: unknown) => unknown;
}

interface IElementOptions {
  mstModel: IAnyModelType;
  component: ElementComponentType;
  // define input options in the properties panel user interface (UI)
  inputs?: InputOptions[];
}

export const ELEMENT_REGISTRY: { [key: string]: IElementOptions } = {};

function registerElement(type: ELEMENT_TYPE, options: IElementOptions) {
  ELEMENT_REGISTRY[type] = options;
}

export function registerAllElements() {
  registerElement(ELEMENT_TYPE.image, {
    mstModel: ImageModel,
    component: ImageElement as FC,
    inputs: [
      {
        propName: "x",
        type: INPUT_TYPE.number,
        normalize: (value) => {
          return Math.round(Number(value) || 0);
        },
      },
    ],
  });
  registerElement(ELEMENT_TYPE.group, {
    mstModel: GroupModel,
    component: GroupElement as FC,
  });
}

// another register way, register in file
// import("@/components/canvas/element/image-element");
