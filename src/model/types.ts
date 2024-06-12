import { GroupModel } from "./group-model.new";
import { ImageModel } from "./image-model.new";
import { LineModel } from "./line-model.new";

export type TChild = GroupModel | LineModel | ImageModel;
export type TChildren = TChild[];
