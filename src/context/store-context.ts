import { createContext, useContext } from "react";

import { Store } from "@/model/store.new";

const storeContext = createContext<Store | null>(null);

export const StoreContextProvider = storeContext.Provider;

export function useStore() {
  const store = useContext(storeContext);

  if (store == null) {
    throw new Error(`useStore must be use in provider. store value: ${store}`);
  }

  return store;
}
