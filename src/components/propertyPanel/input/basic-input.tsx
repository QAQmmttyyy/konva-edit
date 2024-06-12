import { observer } from "mobx-react-lite";
import { ChangeEvent, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { withInputWrapper } from "./input-wrapper";
import { IPropertyInputProps } from "./type";

export const BasicInput = withInputWrapper(
  observer<IPropertyInputProps>(({ element, options }) => {
    const {
      name,
      type,
      placeholder,
      onChange: handleChange,
      normalize,
    } = options;

    const value = element.data[name as keyof typeof element.data] as
      | string
      | number;

    const onChange = useCallback(
      (ev: ChangeEvent<HTMLInputElement>) => {
        handleChange?.(ev.target.value, element, options);
      },
      [element, handleChange, options]
    );

    return (
      <Input
        type={type}
        id={name}
        placeholder={placeholder}
        onChange={onChange}
        value={normalize ? normalize(value) : value}
      />
    );
  })
);
