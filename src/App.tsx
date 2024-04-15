import { DndContext } from "@dnd-kit/core";
import { Workspace } from "./components/canvas/workspace";
import { SidePanel } from "./components/side-panel/side-panel";

const App = () => {
  return (
    <DndContext>
      <div className="w-full h-screen flex">
        <SidePanel />
        <Workspace />
      </div>
    </DndContext>
  );
};

export default App;
