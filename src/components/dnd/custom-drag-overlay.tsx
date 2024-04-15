import { FC, useState } from "react";
import {
  Active as DragActive,
  DragStartEvent,
  DragOverlay,
  useDndMonitor,
  DragOverlayProps,
} from "@dnd-kit/core";

export interface ICustomDragOverlayProps extends DragOverlayProps {
  renderContent: (active: DragActive) => React.ReactNode;
}

export const CustomDragOverlay: FC<ICustomDragOverlayProps> = ({
  renderContent,
  ...restProps
}) => {
  const [active, setActive] = useState<DragActive | null>(null);

  useDndMonitor({
    onDragStart: (event: DragStartEvent) => {
      const { active } = event;
      setActive(active);
    },
    onDragEnd: () => {
      setActive(null);
    },
  });

  return (
    <DragOverlay {...restProps}>{active && renderContent(active)}</DragOverlay>
  );
};
