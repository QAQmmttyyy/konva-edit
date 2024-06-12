import "./index.css";

import Konva from "konva";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import { StoreContextProvider } from "./context/store-context.ts";
import { registerAllElements } from "./lib/element-register.ts";
import { createStore } from "./model/store.new.ts";

export function createApp(container: string) {
  const store = createStore();

  store.addPage({});

  // Configure what mouse buttons can be used for drag and drop. [0] means only left mouse button.
  Konva.dragButtons = [0];

  const domNode = document.getElementById(container)!;
  const root = createRoot(domNode);

  root.render(
    <StrictMode>
      <StoreContextProvider value={store}>
        <App />
      </StoreContextProvider>
    </StrictMode>
  );

  return;
}

registerAllElements();
createApp("root");
