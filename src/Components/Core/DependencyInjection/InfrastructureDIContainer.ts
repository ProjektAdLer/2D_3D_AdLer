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
import IBackendAdapter from "../Adapters/BackendAdapter/IBackendAdapter";
import BackendAdapter from "../Adapters/BackendAdapter/BackendAdapter";
import { config } from "src/config";
import MockBackendAdapter from "../Adapters/BackendAdapter/MockBackendAdapter";

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

  // Backend Adapter
  if (config.useFakeBackend) {
    bind<IBackendAdapter>(CORE_TYPES.IBackendAdapter)
      .to(MockBackendAdapter)
      .inSingletonScope();
  } else {
    bind<IBackendAdapter>(CORE_TYPES.IBackendAdapter)
      .to(BackendAdapter)
      .inSingletonScope();
  }
});

export default infrastructureDIContainer;
