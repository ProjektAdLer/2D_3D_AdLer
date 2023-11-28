import IReactEntry from "./IReactEntry";
import React from "react";
import ReactDOM from "react-dom/client";
import { injectable } from "inversify";
import { Provider } from "inversify-react";
import CoreDIContainer from "../../../../DependencyInjection/CoreDIContainer";
import App from "./App";
import { config } from "../../../../../../config";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import IEntityContainer from "src/Components/Core/Domain/EntityContainer/IEntityContainer";
import ILoggerPort from "src/Components/Core/Application/Ports/Interfaces/ILoggerPort";
import { LogLevelTypes } from "src/Components/Core/Domain/Types/LogLevelTypes";
import SCENE_TYPES, {
  ScenePresenterFactory,
} from "~DependencyInjection/Scenes/SCENE_TYPES";
import LearningSpaceSceneDefinition from "../../../Babylon/SceneManagement/Scenes/LearningSpaceSceneDefinition";

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

    // const strictModeComponent = React.createElement(
    //   React.StrictMode,
    //   null,
    //   providerComponent
    // );

    const rootComponent = ReactDOM.createRoot(
      document.getElementById("root") as HTMLElement
    );

    rootComponent.render(providerComponent);

    this.setDebugShortcut();
  }

  private setDebugShortcut() {
    if (process.env.NODE_ENV === "development" && config.isDebug) {
      /* istanbul ignore next */
      document.onkeyup = function (e) {
        //TODO: Fix Login as Debug

        // // login as debug on ctrl + f1
        // if (e.ctrlKey && e.key == "F1") {
        //   if (isInDebug) {
        //     alert("Already in Debug Mode");
        //     logger.warn("Already in Debug Mode");
        //     return;
        //   }
        //   isInDebug = true;
        //   CoreDIContainer.get<ILoginUseCase>(
        //     USECASE_TYPES.ILoginUseCase
        //   ).executeAsync();
        // }

        // clg all entities on ctrl + f2
        if (e.ctrlKey && e.key === "F2") {
          const entityMap = CoreDIContainer.get<IEntityContainer>(
            CORE_TYPES.IEntityContainer
          ).getAllEntities();
          const logger = CoreDIContainer.get<ILoggerPort>(CORE_TYPES.ILogger);
          logger.log(LogLevelTypes.DEBUG, JSON.stringify(entityMap));
        }
        if (e.ctrlKey && e.key === "i") {
          try {
            const scenePresenter = CoreDIContainer.get<ScenePresenterFactory>(
              SCENE_TYPES.ScenePresenterFactory
            )(LearningSpaceSceneDefinition);
            scenePresenter?.toggleInspector({ overlay: true });
          } catch (error) {
            console.log(error);
          }
        }
      };
    }
  }
}
