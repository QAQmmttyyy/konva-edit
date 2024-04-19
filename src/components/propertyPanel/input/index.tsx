import { FC } from "react";
import { INPUT_TYPE } from "@/lib/constants";
import { NumberInput } from "./number-input";
import { IPropertyInputProps } from "./type";

const INPUT_MAP: { [key: string]: FC<IPropertyInputProps> } = {
  [INPUT_TYPE.number]: NumberInput,
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
