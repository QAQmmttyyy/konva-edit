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
      className={cn(
        {
          visible: showPanel,
          invisible: !showPanel,
        },
        "flex flex-col w-64 absolute top-4 right-4 h-[calc(100%-2rem)]"
      )}
    >
      <CardHeader>
        <CardTitle className="text-xl">Property</CardTitle>
      </CardHeader>
      <ScrollArea className="w-full flex-1">
        <CardContent className="grid gap-2">
          {showPanel &&
            ELEMENT_REGISTRY[selectedElement.type].inputs?.map(
              (inputOptions) => {
                return (
                  <PropertyInput
                    key={inputOptions.propName}
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
