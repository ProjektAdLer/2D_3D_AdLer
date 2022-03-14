import { Container } from "inversify";
import IReactApi from "../API/IReactAPI";
import ReactApi from "../API/ReactApi";
import IReactBuisnessLogic from "../BusinessLogic/API/IReactBuisnessLogic";
import ReactBuisinessLogic from "../BusinessLogic/API/ReactBusinessLogic";
import CoreRenderer from "../BusinessLogic/CoreRenderer/CoreRenderer";
import ICoreRenderer from "../BusinessLogic/CoreRenderer/ICoreRenderer";
import REACT_TYPES from "./ReactTypes";
var ReactDIContainer = new Container();

ReactDIContainer.bind<IReactApi>(REACT_TYPES.IReactApi).to(ReactApi);
ReactDIContainer.bind<IReactBuisnessLogic>(REACT_TYPES.IReactBusinessLogic).to(
  ReactBuisinessLogic
);
ReactDIContainer.bind<ICoreRenderer>(REACT_TYPES.IReactCoreRenderer).to(
  CoreRenderer
);

export default ReactDIContainer;
