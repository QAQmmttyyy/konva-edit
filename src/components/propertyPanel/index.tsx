import { observer } from "mobx-react-lite";
import { useStore } from "@/context/store-context";
import { ELEMENT_REGISTRY } from "@/lib/element-register";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { PropertyInput } from "./input";

export const PropertyPanel = observer(() => {
  const store = useStore();
  const { selectedElements } = store;
  const showPanel = selectedElements.length === 1;
  const selectedElement = selectedElements[0];
  return (
    <Card
      id="property-panel"
      className={cn(
        {
          visible: showPanel,
          invisible: !showPanel,
        },
        "flex flex-col w-64 h-full"
      )}
    >
      <CardHeader>
        <CardTitle className="text-xl">Property</CardTitle>
      </CardHeader>
      <ScrollArea className="w-full flex-1">
        <CardContent className="grid gap-3">
          {showPanel &&
            ELEMENT_REGISTRY[selectedElement.type].inputs?.map(
              (inputOptions) => {
                return (
                  <PropertyInput
                    key={inputOptions.name}
                    element={selectedElement}
                    options={inputOptions}
                  />
                );
              }
            )}
        </CardContent>
      </ScrollArea>
    </Card>
  );
});
