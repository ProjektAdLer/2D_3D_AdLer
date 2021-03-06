import IBackend from "./../Adapters/Backend/IBackend";
import { ContainerModule } from "inversify";
import EntityContainer from "../Domain/EntityContainer/EntityContainer";
import IEntityContainer from "../Domain/EntityContainer/IEntityContainer";
import IReactEntry from "../Presentation/React/ReactEntryPoint/IReactEntry";
import ReactEntry from "../Presentation/React/ReactEntryPoint/ReactEntry";
import IViewModelControllerProvider from "../Presentation/ViewModelProvider/IViewModelControllerProvider";
import ViewModelControllerProvider from "../Presentation/ViewModelProvider/ViewModelControllerProvider";
import CORE_TYPES from "./CoreTypes";
import IEngineManager from "../Presentation/Babylon/EngineManager/IEngineManager";
import EngineManager from "../Presentation/Babylon/EngineManager/EngineManager";
import Backend from "../Adapters/Backend/Backend";

const infrastructureDIContainer = new ContainerModule((bind) => {
  bind<IEngineManager>(CORE_TYPES.IEngineManager)
    .to(EngineManager)
    .inSingletonScope();

  bind<IEntityContainer>(CORE_TYPES.IEntityContainer)
    .to(EntityContainer)
    .inSingletonScope();

  // View Model Provider
  bind<IViewModelControllerProvider>(CORE_TYPES.IViewModelControllerProvider)
    .to(ViewModelControllerProvider)
    .inSingletonScope();

  // React Entry
  bind<IReactEntry>(CORE_TYPES.ICoreRenderer).to(ReactEntry).inSingletonScope();

  // Fake Backend
  bind<IBackend>(CORE_TYPES.IBackend).to(Backend).inSingletonScope();
});

export default infrastructureDIContainer;
