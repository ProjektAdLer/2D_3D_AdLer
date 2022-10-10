import IReactEntry from "./IReactEntry";
import React from "react";
import ReactDOM from "react-dom/client";
import { injectable } from "inversify";
import { Provider } from "inversify-react";
import CoreDIContainer from "../../../../DependencyInjection/CoreDIContainer";
import App from "./App";
import USECASE_TYPES from "../../../../DependencyInjection/UseCases/USECASE_TYPES";
import IDebugUseCase from "../../../../Application/UseCases/Debug/IDebugUseCase";
import { logger } from "../../../../../../Lib/Logger";
import { config } from "../../../../../../config";
import IBackendAdapter from "src/Components/Core/Adapters/BackendAdapter/IBackendAdapter";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import IEntityContainer from "src/Components/Core/Domain/EntityContainer/IEntityContainer";
import WorldEntity from "src/Components/Core/Domain/Entities/WorldEntity";

let isInDebug = false;

@injectable()
export default class ReactEntry implements IReactEntry {
  async setupReact(): Promise<void> {
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

    const bla = ReactDOM.createRoot(
      document.getElementById("root") as HTMLElement
    );

    bla.render(strictModeComponent);

    this.startDebugUseCase();

    this.setDebugShortcut();

    const bla2 = await CoreDIContainer.get<IBackendAdapter>(
      CORE_TYPES.IBackendAdapter
    ).scoreElement("46dd4cbdafda7fc864c8ce73aae3a897", 4, 1);
  }

  private setDebugShortcut() {
    if (process.env.NODE_ENV === "development" && config.isDebug) {
      /* istanbul ignore next */
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
        // clg all entities on ctrl + f2
        if (e.ctrlKey && e.key == "F2") {
          const entityMap = CoreDIContainer.get<IEntityContainer>(
            CORE_TYPES.IEntityContainer
          ).getAllEntities();

          logger.log(entityMap);
        }
      };
    }
  }

  private startDebugUseCase() {
    if (
      config.autoLoginWithoutShortcut &&
      config.nodeEnv === "development" &&
      config.isDebug &&
      !isInDebug
    ) {
      isInDebug = true;
      CoreDIContainer.get<IDebugUseCase>(
        USECASE_TYPES.IDebugUseCase
      ).executeAsync();
    }
  }
}
