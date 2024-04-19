import { observer } from "mobx-react-lite";
import { ChangeEvent, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { camelCaseToSentenceCase } from "@/lib/utils";
import { IPropertyInputProps } from "./type";

export const NumberInput = observer<IPropertyInputProps>(
  ({ element, options }) => {
    const { propName, friendlyName, normalize = Number } = options;
    const value = element[propName as keyof typeof element];

    const onChange = useCallback(
      (ev: ChangeEvent<HTMLInputElement>) => {
        element.set({ [propName]: normalize(ev.target.value) });
      },
      [element, normalize, propName]
    );

    return (
      <div className="grid w-full gap-1.5">
        <Label htmlFor={propName}>
          {friendlyName ?? camelCaseToSentenceCase(propName)}
        </Label>
        <Input
          type="number"
          id={propName}
          onChange={onChange}
          value={normalize(value) as number}
        />
      </div>
    );
  }
);
