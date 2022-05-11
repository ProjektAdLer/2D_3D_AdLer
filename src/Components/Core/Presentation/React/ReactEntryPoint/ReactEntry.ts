import IReactEntry from "./IReactEntry";
import React from "react";
import ReactDOM from "react-dom";
import { injectable } from "inversify";
import { Provider } from "inversify-react";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import App from "./App";

@injectable()
export default class ReactEntry implements IReactEntry {
  setupReact(): void {
    const appComponent = React.createElement(App);
    const providerComponent = React.createElement(
      Provider,
      {
        container: CoreDIContainer,
      },
      appComponent
    );

    const strictModeComponent = React.createElement(
      React.StrictMode,
      null,
      providerComponent
    );

    ReactDOM.render(strictModeComponent, document.getElementById("root"));
  }
}
