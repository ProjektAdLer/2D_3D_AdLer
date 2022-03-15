import ICoreRenderer from "./ICoreRenderer";
import React from "react";
import ReactDOM from "react-dom";
import { injectable } from "inversify";
import App from "../../Presentation/ReactEntry/App";
import { Provider } from "inversify-react";
import REACT_TYPES from "../../DependencyInjection/ReactTypes";
import IEntityManager from "../../Entities/IEntityManager";
import CoreDIContainer from "../../../Core/DependencyInjection/CoreDIContainer";

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

    setTimeout(() => {
      const entityManager = CoreDIContainer.get<IEntityManager>(
        REACT_TYPES.IEntityManager
      );

      entityManager.setData("Hello from the other side");
    }, 2000);
  }
}
