import { IAnyModelType } from "mobx-state-tree";
import { FC } from "react";

import {
  ElementComponentType,
  GroupElement,
} from "@/components/canvas/element";
import { ImageElement } from "@/components/canvas/element/image-element";
import { LineElement } from "@/components/canvas/element/line-element";
import { GroupModel } from "@/model/group-model";
import { ImageModel } from "@/model/image-model";
import { LineModel } from "@/model/line-model";
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
  placeholder?: string;
  bindable?: boolean;
  normalize?: (value: unknown) => unknown;
  onChange?: (
    value: unknown,
    element: INodeInstance,
    inputOptions: IInputOptions
  ) => void;
  /**
   * use with select type
   */
  selectOptions?: string[];
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
  registerElement(ELEMENT_TYPE.group, {
    mstModel: GroupModel,
    component: GroupElement as FC,
  });
  registerElement(ELEMENT_TYPE.image, {
    mstModel: ImageModel,
    component: ImageElement as FC,
    inputs: [...COMMON_INPUT_OPTIONS],
  });
  registerElement(ELEMENT_TYPE.line, {
    mstModel: LineModel,
    component: LineElement as FC,
    inputs: [
      // example
      ...COMMON_INPUT_OPTIONS,
      {
        name: "strokeWidth",
        type: INPUT_TYPE.number,
        onChange: (value, element, inputOptions) => {
          const { name, normalize } = inputOptions;
          element.set({ [name]: normalize!(value) });
        },
        normalize: (value) => {
          return Math.round(Number(value)) || 0;
        },
      },
    ],
  });
}

const COMMON_INPUT_OPTIONS: IInputOptions[] = [
  {
    name: "currentState",
    type: INPUT_TYPE.stateSelect,
    placeholder: "Select a state",
    bindable: true,
    selectOptions: ["none"],
    onChange: (value, element) => {
      if (typeof value === "string") {
        element.setCurrentState(value === "none" ? "" : value);
      }
    },
  },
  {
    name: "name",
    type: INPUT_TYPE.text,
    bindable: true,
    onChange: (value, element, inputOptions) => {
      element.set({ [inputOptions.name]: value });
    },
  },
  {
    name: "width",
    type: INPUT_TYPE.number,
    onChange: (value, element, inputOptions) => {
      const { name, normalize } = inputOptions;
      element.set({ [name]: normalize!(value) });
    },
    normalize: (value) => {
      return Math.round(Number(value)) || 0;
    },
  },
];

// another register way, register in file
// import("@/components/canvas/element/image-element");
