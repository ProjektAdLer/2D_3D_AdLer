import React from "react";
import ReactDOM from "react-dom";
import App from "../App";

export default class ReactApi {
  initReact() {
    ReactDOM.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      document.getElementById("root")
    );
  }
}
