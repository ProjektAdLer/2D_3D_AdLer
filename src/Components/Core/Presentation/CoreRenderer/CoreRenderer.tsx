import ICoreRenderer from "./ICoreRenderer";
import React from "react";
import ReactDOM from "react-dom";
import { injectable } from "inversify";
import App from "../ReactEntry/App";
import { Provider } from "inversify-react";
import CoreDIContainer from "../../DependencyInjection/CoreDIContainer";

@injectable()
export default class implements ICoreRenderer {
  setupReact(): void {
    ReactDOM.render(
      <React.StrictMode>
        <Provider container={CoreDIContainer}>
          <App />
        </Provider>
      </React.StrictMode>,
      document.getElementById("root")
    );
  }
}
