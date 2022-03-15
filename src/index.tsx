import "reflect-metadata";
import IReactApi from "./Components/React/API/IReactAPI";
import REACT_TYPES from "./Components/React/DependencyInjection/ReactTypes";
import CoreDIContainer from "./Components/Core/DependencyInjection/CoreDIContainer";

const ReactCore = CoreDIContainer.get<IReactApi>(REACT_TYPES.IReactApi);
ReactCore.initReact();
