import {
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { elements } from "./shape-elements.json";

export const ShapePanel: React.FC<{ name: string }> = ({ name }) => {
  return (
    <TabsContent value={name} className="w-[301px] !ml-0 bg-white border-r">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>
          click or drag to add the shape element.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 place-content-stretch">
          {elements.map(({ id, name, src }) => (
            <div
              key={id + name}
              className="h-20 flex items-center justify-center rounded-sm hover:bg-slate-100"
            >
              <img src={src} alt={name} />
            </div>
          ))}
        </div>
      </CardContent>
    </TabsContent>
  );
};
