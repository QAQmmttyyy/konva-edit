import { model, Model, prop } from "mobx-keystone";

import { TChildren } from "./types";

@model("Page")
export class Page extends Model({
  id: prop<string>(),
  children: prop<TChildren>(() => []),
}) {}
