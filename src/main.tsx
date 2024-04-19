import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { addMiddleware, onSnapshot } from "mobx-state-tree";
import { actionLogger } from "mst-middlewares";
import { StoreContextProvider } from "./context/store-context.ts";
import { createStore } from "./model/store.ts";
import { registerAllElements } from "./lib/element-register.ts";
import App from "./App.tsx";
import "./index.css";

export function createApp(container: string) {
  const store = createStore();
  onSnapshot(store, (newSnapshot) => {
    console.info("Got new snapshot:", newSnapshot);
  });
  addMiddleware(store, actionLogger);
  store.addPage();

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
