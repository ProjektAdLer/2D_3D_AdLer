import { FakeBackend } from "./../Adapters/Backend/FakeBackend";
import { IBackend } from "./../Adapters/Backend/IBackend";
import { ContainerModule } from "inversify";
import EntityContainer from "../Domain/EntityContainer/EntityContainer";
import IEntityContainer from "../Domain/EntityContainer/IEntityContainer";
import EntityManager from "../Domain/EntityManager/EntityManager";
import IEntityManager from "../Domain/EntityManager/IEntityManager";
import IReactEntry from "../Presentation/React/ReactEntryPoint/IReactEntry";
import ReactEntry from "../Presentation/React/ReactEntryPoint/ReactEntry";
import IViewModelProvider from "../Presentation/ViewModelProvider/IViewModelProvider";
import ViewModelProvider from "../Presentation/ViewModelProvider/ViewModelProvider";
import CORE_TYPES from "./CoreTypes";

const infrastructureDIContainer = new ContainerModule((bind) => {
  bind<IEntityContainer>(CORE_TYPES.IEntityContainer)
    .to(EntityContainer)
    .inSingletonScope();

  // View Model Provider
  bind<IViewModelProvider>(CORE_TYPES.IViewModelProvider)
    .to(ViewModelProvider)
    .inSingletonScope();

  // React Entry
  bind<IReactEntry>(CORE_TYPES.ICoreRenderer).to(ReactEntry).inSingletonScope();

  // Entity Manager
  bind<IEntityManager>(CORE_TYPES.IEntityManager)
    .to(EntityManager)
    .inSingletonScope();

  // Fake Backend
  bind<IBackend>(CORE_TYPES.IBackend).to(FakeBackend).inSingletonScope();
});

export default infrastructureDIContainer;
