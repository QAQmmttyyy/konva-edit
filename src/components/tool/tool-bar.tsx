import {
  CircleIcon,
  MinusIcon,
  MousePointerIcon,
  SquareIcon,
  TypeIcon,
} from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { TOOL_MODE } from "@/lib/constants";
import { observer } from "mobx-react-lite";
import { useStore } from "@/context/store-context";

export const ToolBar = observer(() => {
  const store = useStore();
  return (
    <Card className="p-1 flex absolute top-4 left-1/2 -translate-x-1/2">
      <div className="flex items-center gap-1">
        {TOOLS.map((tool) => {
          return (
            <Button
              key={tool.name}
              variant="ghost"
              className="w-fit h-fit p-2"
              data-state={tool.mode === store.toolMode ? "selected" : ""}
              onClick={() => store.setToolMode(tool.mode)}
            >
              <tool.icon className="h-4 w-4" />
            </Button>
          );
        })}
      </div>
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
