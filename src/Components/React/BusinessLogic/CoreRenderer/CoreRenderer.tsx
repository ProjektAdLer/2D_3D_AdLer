import ICoreRenderer from "./ICoreRenderer";
import React from "react";
import ReactDOM from "react-dom";
import { injectable } from "inversify";
import App from "../../Presentation/ReactEntry/App";
import { Provider } from "inversify-react";
import ReactDIContainer from "../../DependencyInjection/ReactDIContainer";
import IEngineManager from "../../../Core/Presentation/EngineManager/IEngineManager";
import REACT_TYPES from "../../DependencyInjection/ReactTypes";
import IEntityManager from "../../Entities/IEntityManager";

@injectable()
export default class CoreRenderer implements ICoreRenderer {
  setupReact(): void {
    ReactDOM.render(
      <React.StrictMode>
        <Provider container={ReactDIContainer}>
          <App />
        </Provider>
      </React.StrictMode>,
      document.getElementById("root")
    );

    setTimeout(() => {
      const test = ReactDIContainer.get<IEntityManager>(
        REACT_TYPES.IEntityManager
      );

      test.setData("33333");
    }, 2000);
  }
}
