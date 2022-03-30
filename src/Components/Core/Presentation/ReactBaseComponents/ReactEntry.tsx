import ICoreRenderer from "./ICoreRenderer";
import React from "react";
import ReactDOM from "react-dom";
import { injectable } from "inversify";
import { Provider } from "inversify-react";
import CoreDIContainer from "../../DependencyInjection/CoreDIContainer";
import App from "./App";

@injectable()
export default class CoreRenderer implements ICoreRenderer {
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
