import IReactEntry from "./IReactEntry";
import React from "react";
import ReactDOM from "react-dom/client";
import { injectable } from "inversify";
import { Provider } from "inversify-react";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import App from "./App";
import IPresentationDirector from "../../PresentationBuilder/IPresentationDirector";
import IPresentationBuilder from "../../PresentationBuilder/IPresentationBuilder";
import BUILDER_TYPES from "../../../DependencyInjection/Builders/BUILDER_TYPES";
import USECASE_TYPES from "../../../DependencyInjection/UseCases/USECASE_TYPES";
import IDebugUseCase from "../../../Application/DebugUseCase/IDebugUseCase";
import { logger } from "../../../../../Lib/Logger";
import { config } from "../../../../../config";

let isInDebug = false;

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

    ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
      strictModeComponent
    );

    if (
      config.autoLoginWithoutShortcut &&
      process.env.NODE_ENV === "development" &&
      config.isDebug &&
      !isInDebug
    ) {
      isInDebug = true;
      CoreDIContainer.get<IDebugUseCase>(
        USECASE_TYPES.IDebugUseCase
      ).executeAsync();
    }

    if (process.env.NODE_ENV === "development" && config.isDebug) {
      document.onkeyup = function (e) {
        if (e.ctrlKey && e.key == "F1") {
          if (isInDebug) {
            alert("Already in Debug Mode");
            logger.warn("Already in Debug Mode");
            return;
          }
          isInDebug = true;
          CoreDIContainer.get<IDebugUseCase>(
            USECASE_TYPES.IDebugUseCase
          ).executeAsync();
        }
      };
    }
  }

  private buildViewModels(): void {
    let director = CoreDIContainer.get<IPresentationDirector>(
      BUILDER_TYPES.IPresentationDirector
    );

    director.build(
      CoreDIContainer.get<IPresentationBuilder>(
        BUILDER_TYPES.IMoodleLoginFormBuilder
      )
    );

    director.build(
      CoreDIContainer.get<IPresentationBuilder>(
        BUILDER_TYPES.ILearningElementsDropdownBuilder
      )
    );

    director.build(
      CoreDIContainer.get<IPresentationBuilder>(
        BUILDER_TYPES.IErrorModalManagerBuilder
      )
    );

    director.build(
      CoreDIContainer.get<IPresentationBuilder>(
        BUILDER_TYPES.IMoodleLoginButtonBuilder
      )
    );

    director.build(
      CoreDIContainer.get<IPresentationBuilder>(
        BUILDER_TYPES.IBottomTooltipBuilder
      )
    );

    director.build(
      CoreDIContainer.get<IPresentationBuilder>(
        BUILDER_TYPES.IDebugPanelBuilder
      )
    );

    director.build(
      CoreDIContainer.get<IPresentationBuilder>(
        BUILDER_TYPES.ILearningWorldNamePanelBuilder
      )
    );
  }
}
