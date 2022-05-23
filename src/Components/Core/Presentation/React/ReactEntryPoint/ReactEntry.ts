import IReactEntry from "./IReactEntry";
import React from "react";
import ReactDOM from "react-dom";
import { injectable } from "inversify";
import { Provider } from "inversify-react";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import App from "./App";
import IPresentationDirector from "../../PresentationBuilder/IPresentationDirector";
import IPresentationBuilder from "../../PresentationBuilder/IPresentationBuilder";
import BUILDER_TYPES from "../../../DependencyInjection/Builders/BUILDER_TYPES";

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

    this.buildViewModels();

    ReactDOM.render(strictModeComponent, document.getElementById("root"));
  }

  private buildViewModels(): void {
    let director = CoreDIContainer.get<IPresentationDirector>(
      BUILDER_TYPES.IPresentationDirector
    );
    let builder = CoreDIContainer.get<IPresentationBuilder>(
      BUILDER_TYPES.IMoodleLoginFormBuilder
    );
    director.Builder = builder;
    director.build();
  }
}
