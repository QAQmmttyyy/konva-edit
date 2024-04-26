import { DndContext } from "@dnd-kit/core";
import { Workspace } from "./components/canvas/workspace";
import { SidePanel } from "./components/side-panel/side-panel";
import { PropertyPanel } from "./components/propertyPanel";
import { PaintToolBar } from "./components/paint-tool/paint-tool-bar";

const App = () => {
  return (
    <DndContext>
      <div className="w-full h-screen flex">
        <SidePanel />
        <div className="w-full h-full flex-1 relative">
          <Workspace />
          <PropertyPanel />
          <PaintToolBar />
        </div>
      </div>
    </DndContext>
  );
};

export default App;
