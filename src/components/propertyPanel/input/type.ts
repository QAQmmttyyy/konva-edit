import { InputOptions } from "@/lib/element-register";
import { INodeInstance } from "@/model/node-model";

export interface IPropertyInputProps {
  element: INodeInstance;
  options: InputOptions;
}