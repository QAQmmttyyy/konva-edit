import { AppDndContext } from "./components/dnd/app-dnd-context";
import { Workspace } from "./components/canvas/workspace";
import { SidePanel } from "./components/side-panel/side-panel";

const App = () => {
  return (
    <AppDndContext>
      <div className="w-full h-screen flex">
        <SidePanel />
        <Workspace />
      </div>
    </AppDndContext>
  );
};

export default App;
