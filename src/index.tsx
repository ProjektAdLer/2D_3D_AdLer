import "reflect-metadata";
import ReactDIContainer from "./Components/React/DependencyInjection/ReactDIContainer";
import IReactApi from "./Components/React/API/IReactAPI";
import REACT_TYPES from "./Components/React/DependencyInjection/ReactTypes";

const ReactCore = ReactDIContainer.get<IReactApi>(REACT_TYPES.IReactApi);
ReactCore.initReact();
