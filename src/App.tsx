import { DndContext } from "@dnd-kit/core";
import { Workspace } from "./components/canvas/workspace";
import { SidePanel } from "./components/side-panel/side-panel";
import { PropertyPanel } from "./components/propertyPanel";
import { ToolBar } from "./components/tool/tool-bar";

const App = () => {
  return (
    <DndContext>
      <div className="w-full h-screen flex">
        <SidePanel />
        <div className="w-full h-full flex-1 relative">
          <Workspace />
          <PropertyPanel />
          <ToolBar />
        </div>
      </div>
    </DndContext>
  );
};

export default App;
