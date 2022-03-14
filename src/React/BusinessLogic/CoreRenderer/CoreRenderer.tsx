import ICoreRenderer from "./ICoreRenderer";
import React from "react";
import ReactDOM from "react-dom";
import App from "../../App";
import { injectable } from "inversify";

@injectable()
export default class CoreRenderer implements ICoreRenderer {
  setupReact(): void {
    ReactDOM.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      document.getElementById("root")
    );
  }
}
