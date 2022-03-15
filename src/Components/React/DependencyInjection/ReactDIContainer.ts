import { Container } from "inversify";
import IReactApi from "../API/IReactAPI";
import ReactApi from "../API/ReactApi";
import IReactBusinessLogic from "../BusinessLogic/API/IReactBusinessLogic";
import ReactBusinessLogic from "../BusinessLogic/API/ReactBusinessLogic";
import CoreRenderer from "../BusinessLogic/CoreRenderer/CoreRenderer";
import ICoreRenderer from "../BusinessLogic/CoreRenderer/ICoreRenderer";
import EntityManager from "../Entities/EntityManager";
import IEntityManager from "../Entities/IEntityManager";
import REACT_TYPES from "./ReactTypes";
var ReactDIContainer = new Container();

ReactDIContainer.bind<IReactApi>(REACT_TYPES.IReactApi).to(ReactApi);
ReactDIContainer.bind<IReactBusinessLogic>(REACT_TYPES.IReactBusinessLogic).to(
  ReactBusinessLogic
);
ReactDIContainer.bind<ICoreRenderer>(REACT_TYPES.IReactCoreRenderer).to(
  CoreRenderer
);
ReactDIContainer.bind<IEntityManager>(REACT_TYPES.IEntityManager)
  .to(EntityManager)
  .inSingletonScope();

export default ReactDIContainer;
