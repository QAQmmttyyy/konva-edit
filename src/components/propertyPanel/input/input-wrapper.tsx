/* eslint-disable react-refresh/only-export-components */
import { LinkIcon } from "lucide-react";
import { FC, PropsWithChildren } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { camelCaseToSentenceCase } from "@/lib/utils";
import { IPropertyInputProps } from "./type";

const InputWrapper: FC<PropsWithChildren<IPropertyInputProps>> = ({
  element,
  options,
  children,
}) => {
  const { name, friendlyName, bindable } = options;

  return (
    <div className="grid w-full gap-1.5">
      <div className="flex justify-between items-center">
        <Label htmlFor={name}>
          {friendlyName ?? camelCaseToSentenceCase(name)}
        </Label>
        {bindable && (
          <Button
            name="data-bind"
            variant="ghost"
            className="w-fit h-fit p-2"
            onClick={() => {
              // example
              element.setBindings(name, "elements[0].name");
            }}
          >
            <LinkIcon className="w-3 h-3" />
          </Button>
        )}
      </div>
      {children}
    </div>
  );
};

export function withInputWrapper<P extends IPropertyInputProps>(Comp: FC<P>) {
  return (props: P) => (
    <InputWrapper {...props}>
      <Comp {...props} />
    </InputWrapper>
  );
}
