import React from "react";
import ReactDOM from "react-dom";
import Provider from "./context";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "bulma/css/bulma.css";

ReactDOM.render(
  <Provider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
