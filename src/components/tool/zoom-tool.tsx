import { ZoomInIcon, ZoomOutIcon } from "lucide-react";
import { observer } from "mobx-react-lite";
import { useState } from "react";

import { useStore } from "@/context/store-context";

import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { getZoomPercentage } from "./helper";

export const ZoomTool = observer(() => {
  const store = useStore();
  const [open, setOpen] = useState(false);
  const onZoomOut = () => {
    store.zoomOut();
  };
  const onZoomIn = () => {
    store.zoomIn();
  };

  return (
    <div className="flex items-center gap-1">
      <Button key="zoom-out" variant="ghost" size="icon" onClick={onZoomOut}>
        <ZoomOutIcon className="h-4 w-4" />
      </Button>

      <DropdownMenu
        onOpenChange={(open) => {
          setOpen(open);
        }}
      >
        <DropdownMenuTrigger asChild>
          <Button
            key="zoom-percentage"
            variant="ghost"
            className="px-3"
            data-state={open ? "selected" : ""}
          >
            {getZoomPercentage(store.pageScale)}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          {SCALE_VALUE_PRESETS.map((scale) => (
            <DropdownMenuCheckboxItem
              key={scale}
              checked={store.pageScale === scale}
              onCheckedChange={(checked) => {
                if (checked) {
                  store.setPageScale(scale);
                }
              }}
            >
              {getZoomPercentage(scale)}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <Button key="zoom-in" variant="ghost" size="icon" onClick={onZoomIn}>
        <ZoomInIcon className="h-4 w-4" />
      </Button>
    </div>
  );
});

const SCALE_VALUE_PRESETS = [0.5, 1, 1.5, 2, 3];
