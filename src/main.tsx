import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { StoreContextProvider } from "./context/store-context.ts";
import { createStore } from "./model/store.ts";
import App from "./App.tsx";
import "./index.css";

export function createApp(container: string) {
  const store = createStore();
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

createApp("root");
