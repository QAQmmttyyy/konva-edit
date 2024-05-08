export const ELEMENT_NODE_NAME = "element";

export enum ELEMENT_TYPE {
  group = "group",
  image = "image",
  line = "line",
}

export enum INPUT_TYPE {
  // basic
  text = "text",
  number = "number",
  select = "select",
  // custom
  stateSelect = "stateSelect",
}

export enum TOOL_MODE {
  select = "select",
  hand = "hand",
  rect = "rect",
  circle = "circle",
  line = "line",
  text = "text",
}

export enum MOUSE_BUTTON {
  left = 0,
  middle = 1,
  right = 2,
}

export const MIN_SCALE = 0.2;
export const MAX_SCALE = 30;
export const SCALE_STEP = 0.05;