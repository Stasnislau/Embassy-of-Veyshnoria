import "./index.css";

import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import Store from "./Store/store";
import reportWebVitals from "./reportWebVitals";

interface stateInterface {
  store: Store;
}

const store = new Store();
export const Context = React.createContext<stateInterface>({ store });
const root = document.getElementById("root")!;
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Context.Provider value={{ store }}>
      <App />
    </Context.Provider>
  </React.StrictMode>,
);

reportWebVitals();
