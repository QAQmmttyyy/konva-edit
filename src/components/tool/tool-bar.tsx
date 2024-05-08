import {
  CircleIcon,
  HandIcon,
  MinusIcon,
  MousePointerIcon,
  SquareIcon,
  TypeIcon,
} from "lucide-react";
import { observer } from "mobx-react-lite";

import { useStore } from "@/context/store-context";
import { TOOL_MODE } from "@/lib/constants";

import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Separator } from "../ui/separator";
import { ZoomTool } from "./zoom-tool";

export const ToolBar = observer(() => {
  const store = useStore();
  return (
    <Card className="p-1 flex items-center gap-1">
      {TOOLS.map((tool) => {
        return (
          <Button
            key={tool.name}
            variant="ghost"
            size="icon"
            data-state={tool.mode === store.toolMode ? "selected" : ""}
            onClick={() => store.setToolMode(tool.mode)}
          >
            <tool.icon className="h-4 w-4" />
          </Button>
        );
      })}

      <Separator orientation="vertical" className="h-6" />
      <ZoomTool />
    </Card>
  );
});

const TOOLS = [
  {
    name: "Select",
    mode: TOOL_MODE.select,
    icon: MousePointerIcon,
  },
  {
    name: "Hand",
    mode: TOOL_MODE.hand,
    icon: HandIcon,
  },
  {
    name: "Rectangle",
    mode: TOOL_MODE.rect,
    icon: SquareIcon,
  },
  {
    name: "Circle",
    mode: TOOL_MODE.circle,
    icon: CircleIcon,
  },
  {
    name: "Line",
    mode: TOOL_MODE.line,
    icon: MinusIcon,
  },
  {
    name: "Text",
    mode: TOOL_MODE.text,
    icon: TypeIcon,
  },
];
