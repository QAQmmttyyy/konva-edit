import { observer } from "mobx-react-lite";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import { useState } from "react";
import { CirclePlusIcon } from "lucide-react";

export const StateSelectInput = withInputWrapper(
  observer<IPropertyInputProps>(({ element, options }) => {
    const { states } = element;
    const { name, placeholder, selectOptions = [], onChange } = options;

    const valueItems = selectOptions.concat(Object.keys(states));

    const [newStateName, setNewStateName] = useState("");

    return (
      <Select
        value={element.currentState || selectOptions[0]}
        onValueChange={(value) => onChange?.(value, element, options)}
      >
        <SelectTrigger id={name}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {valueItems.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectGroup>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="secondary" className="w-full h-8 mt-1.5">
                <CirclePlusIcon className="h-4 w-4 mr-2" />
                Create new state
              </Button>
            </PopoverTrigger>
            <PopoverContent side="left">
              <div className="flex flex-col gap-4">
                <Input
                  type="text"
                  placeholder="Input state name"
                  value={newStateName}
                  onChange={(ev) => setNewStateName(ev.target.value)}
                />
                <Button
                  variant="secondary"
                  className="h-9"
                  onClick={() => {
                    setNewStateName("");
                    element.createState(newStateName);
                  }}
                  disabled={newStateName.trim() === ""}
                >
                  Create
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </SelectContent>
      </Select>
    );
  })
);
