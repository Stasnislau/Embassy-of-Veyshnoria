import "./index.css";

import App from "./App";
import React from "react";
import ReactDOM from "react-dom";
import Store from "./Store/store";
import reportWebVitals from "./reportWebVitals";

interface stateInterface {
  store: Store;
}

const store = new Store();
export const Context = React.createContext<stateInterface>({ store });

ReactDOM.render(
  <React.StrictMode>
    <Context.Provider value={{ store }}>
      <App />
    </Context.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
