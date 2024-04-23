import { observer } from "mobx-react-lite";
import { ChangeEvent, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { withInputWrapper } from "./input-wrapper";
import { IPropertyInputProps } from "./type";

const InnerBasicInput = observer<IPropertyInputProps>(
  ({ element, options }) => {
    const { name, type, onChange: handleChange, normalize } = options;
    const value =
      element.processedSelf[name as keyof typeof element.processedSelf];

    const onChange = useCallback(
      (ev: ChangeEvent<HTMLInputElement>) => {
        handleChange?.(ev, element, options);
      },
      [element, handleChange, options]
    );

    return (
      <Input
        type={type}
        id={name}
        onChange={onChange}
        value={normalize ? normalize(value) : value}
      />
    );
  }
);

export const BasicInput = withInputWrapper(InnerBasicInput);
