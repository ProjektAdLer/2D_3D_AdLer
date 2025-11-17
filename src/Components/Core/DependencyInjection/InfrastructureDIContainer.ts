import { ContainerModule } from "inversify";
import EntityContainer from "../Domain/EntityContainer/EntityContainer";
import IEntityContainer from "../Domain/EntityContainer/IEntityContainer";
import IReactEntry from "../Presentation/React/ReactRelated/ReactEntryPoint/IReactEntry";
import ReactEntry from "../Presentation/React/ReactRelated/ReactEntryPoint/ReactEntry";
import IViewModelControllerProvider from "../Presentation/ViewModelProvider/IViewModelControllerProvider";
import ViewModelControllerProvider from "../Presentation/ViewModelProvider/ViewModelControllerProvider";
import CORE_TYPES from "./CoreTypes";
import IBackendPort from "../Application/Ports/Interfaces/IBackendPort";
import BackendAdapter from "../Adapters/BackendAdapter/BackendAdapter";
import { config } from "src/config";
import MockBackendAdapter from "../Adapters/BackendAdapter/MockBackendAdapter";
import FileBasedBackendAdapter from "../Adapters/BackendAdapter/FileBasedBackendAdapter";

const infrastructureDIContainer = new ContainerModule((bind) => {
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
  if (config.useFileBasedBackend) {
    bind<IBackendPort>(CORE_TYPES.IBackendAdapter)
      .to(FileBasedBackendAdapter)
      .inSingletonScope();
  } else if (config.useFakeBackend) {
    bind<IBackendPort>(CORE_TYPES.IBackendAdapter)
      .to(MockBackendAdapter)
      .inSingletonScope();
  } else {
    bind<IBackendPort>(CORE_TYPES.IBackendAdapter)
      .to(BackendAdapter)
      .inSingletonScope();
  }
});

export default infrastructureDIContainer;
