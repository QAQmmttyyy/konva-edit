import { ShapesIcon } from "lucide-react";
import { TabsTrigger } from "@/components/ui/tabs";

export const ShapeTab: React.FC<{ name: string }> = ({ name }) => {
  return (
    <TabsTrigger value={name} className="gap-0.5 p-3">
      <ShapesIcon />
    </TabsTrigger>
  );
};
