import ICoreRenderer from "./ICoreRenderer";
import React from "react";
import ReactDOM from "react-dom";
import { injectable } from "inversify";
import App from "../../Presentation/ReactEntry/App";

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
