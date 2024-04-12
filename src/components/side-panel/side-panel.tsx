import { Tabs, TabsList } from "../ui/tabs";
import { ShapeSection } from "./shape-section";

const sections = [ShapeSection];

export const SidePanel = () => {
  return (
    <Tabs
      defaultValue={sections[0].name}
      className="h-full data-ov:flex"
      orientation="vertical"
    >
      <TabsList className="rounded-none">
        {sections.map((s) => (
          <s.Tab key={s.name} name={s.name} />
        ))}
      </TabsList>
      {sections.map((s) => (
        <s.Panel key={s.name} name={s.name} />
      ))}
    </Tabs>
  );
};
