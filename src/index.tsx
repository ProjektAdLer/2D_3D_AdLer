import "reflect-metadata";
import IReactApi from "./Components/React/API/IReactAPI";
import REACT_TYPES from "./Components/React/DependencyInjection/ReactTypes";
import CoreDIContainer from "./Components/Core/DependencyInjection/CoreDIContainer";
import IEntityManager from "./Components/Core/BusinessLogic/EntityManager/IEntityManager";
import CORE_TYPES from "./Components/Core/DependencyInjection/CoreTypes";
import INewEntityManager from "./Components/Core/BusinessLogic/EntityManager/NewEntityManager/INewEntityManager";

const ReactCore = CoreDIContainer.get<IReactApi>(REACT_TYPES.IReactApi);

ReactCore.initReact();
