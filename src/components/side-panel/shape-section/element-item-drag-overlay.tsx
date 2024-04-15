import { CustomDragOverlay } from "@/components/dnd/custom-drag-overlay";
import { ElementItem, IElementItemData } from "./element-item";

export const ElementItemDragOverlay = () => {
  return (
    <CustomDragOverlay
      dropAnimation={null}
      renderContent={({ data }) => {
        const dragItemData = data.current as IElementItemData | undefined;

        return (
          dragItemData && <ElementItem className="h-20" data={dragItemData} />
        );
      }}
    />
  );
};
