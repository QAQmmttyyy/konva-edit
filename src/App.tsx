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
        {/* overflow-hidden here, to fix responsive stage */}
        <div className="w-full h-full flex-1 relative overflow-hidden">
          <Workspace />

          <div className="invisible absolute top-14 right-4 h-[calc(100%-4.5rem)]">
            <PropertyPanel />
          </div>

          <div className="absolute top-4 left-1/2 -translate-x-1/2">
            <ToolBar />
          </div>
        </div>
      </div>
    </DndContext>
  );
};

export default App;
