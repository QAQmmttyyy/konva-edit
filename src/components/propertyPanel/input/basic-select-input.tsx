import { observer } from "mobx-react-lite";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { withInputWrapper } from "./input-wrapper";
import { IPropertyInputProps } from "./type";

export const BasicSelectInput = withInputWrapper(
  observer<IPropertyInputProps>(({ element, options }) => {
    const { states } = element;
    const { name, selectOptions = [] } = options;
    const valueItems = selectOptions.concat(Object.keys(states));
    return (
      <Select defaultValue={selectOptions[0]}>
        <SelectTrigger id={name}>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {valueItems.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  })
);
