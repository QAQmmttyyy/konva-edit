import { ChangeEvent, FC } from "react";
import { IAnyModelType } from "mobx-state-tree";
import {
  ElementComponentType,
  GroupElement,
} from "@/components/canvas/element";
import { ImageElement } from "@/components/canvas/element/image-element";
import { GroupModel } from "@/model/group-model";
import { ImageModel } from "@/model/image-model";
import { INodeInstance } from "@/model/node-model";
import { ELEMENT_TYPE, INPUT_TYPE } from "./constants";

/**
 * Can be expanded on demand
 */
export interface IInputOptions {
  /** This is the name of the mst-model prop this input represents */
  name: string;
  /**
   * The type of input to use, such as 'text', inspired by: builder.io
   *
   * [here](https://www.builder.io/c/docs/custom-components-input-types)
   */
  type: INPUT_TYPE;

  /** A friendlier name to show in the UI if the component prop name is not ideal for end users */
  friendlyName?: string;
  bindable?: boolean;
  normalize?: (value: unknown) => unknown;
  onChange?: (
    ev: ChangeEvent<HTMLInputElement>,
    element: INodeInstance,
    options: IInputOptions
  ) => void;
}

interface IElementOptions {
  mstModel: IAnyModelType;
  component: ElementComponentType;
  // define input options in the properties panel user interface (UI)
  inputs?: IInputOptions[];
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
      // example
      {
        name: "name",
        type: INPUT_TYPE.text,
        bindable: true,
        onChange: (ev, element, options) => {
          element.set({ [options.name]: ev.target.value });
        },
      },
      {
        name: "width",
        type: INPUT_TYPE.number,
        onChange: (ev, element, options) => {
          const { name, normalize } = options;
          element.set({ [name]: normalize!(ev.target.value) });
        },
        normalize: (value) => {
          return Math.round(Number(value)) || 0;
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
