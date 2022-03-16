import { ContainerModule, interfaces } from "inversify";
import IReactApi from "../API/IReactAPI";
import ReactApi from "../API/ReactApi";
import IReactBusinessLogic from "../BusinessLogic/API/IReactBusinessLogic";
import ReactBusinessLogic from "../BusinessLogic/API/ReactBusinessLogic";
import CoreRenderer from "../BusinessLogic/CoreRenderer/CoreRenderer";
import ICoreRenderer from "../BusinessLogic/CoreRenderer/ICoreRenderer";
import REACT_TYPES from "./ReactTypes";

let reactContainerModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<IReactApi>(REACT_TYPES.IReactApi).to(ReactApi).inSingletonScope();
  bind<IReactBusinessLogic>(REACT_TYPES.IReactBusinessLogic)
    .to(ReactBusinessLogic)
    .inSingletonScope();
  bind<ICoreRenderer>(REACT_TYPES.IReactCoreRenderer)
    .to(CoreRenderer)
    .inSingletonScope();
});

export default reactContainerModule;
