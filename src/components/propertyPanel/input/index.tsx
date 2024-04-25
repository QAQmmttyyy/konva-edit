import { FC } from "react";
import { INPUT_TYPE } from "@/lib/constants";
import { IPropertyInputProps } from "./type";
import { BasicInput } from "./basic-input";
import { BasicSelectInput } from "./basic-select-input";
import { StateSelectInput } from "./state-select-input";

const INPUT_MAP: { [key: string]: FC<IPropertyInputProps> } = {
  [INPUT_TYPE.number]: BasicInput,
  [INPUT_TYPE.text]: BasicInput,
  [INPUT_TYPE.select]: BasicSelectInput,
  [INPUT_TYPE.stateSelect]: StateSelectInput,
};

export const PropertyInput: FC<IPropertyInputProps> = ({
  element,
  options,
}) => {
  const { type } = options;
  const InputComp = INPUT_MAP[type];
  return InputComp ? (
    <InputComp element={element} options={options} />
  ) : (
    (console.warn("Not support this input type: ", type), null)
  );
};
