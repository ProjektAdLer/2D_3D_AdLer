import { LoadWorldController } from "../Presentation/React/LoadWorldButton/LoadWorldController";
import ILoadWorldController from "../Presentation/React/LoadWorldButton/ILoadWorldController";
import { Container } from "inversify";
import CORE_TYPES from "./CoreTypes";
import ISceneView from "../Presentation/Babylon/SceneManagement/ISceneView";
import SceneView from "../Presentation/Babylon/SceneManagement/SceneView";
import SceneViewModel from "../Presentation/Babylon/SceneManagement/SceneViewModel";
import ScenePresenter from "../Presentation/Babylon/SceneManagement/ScenePresenter";
import MainScene from "../Presentation/Babylon/SceneManagement/MainScene";
import ICreateSceneClass from "../Presentation/Babylon/SceneManagement/ICreateSceneClass";
import IScenePresenter from "../Presentation/Babylon/SceneManagement/IScenePresenter";
import infrastructureDIContainer from "./InfrastructureDIContainer";
import useCaseDIContainer from "./UseCases/UseCaseDIConatiner";
import PortsDIContainer from "./Ports/PortsDIContainer";
import BuilderDIContainer from "./Builders/BuilderDIContainer";
import INavigation from "../Presentation/Babylon/Navigation/INavigation";
import Navigation from "../Presentation/Babylon/Navigation/Navigation";
import NavigationConfiguration from "../Presentation/Babylon/Navigation/NavigationConfiguration";

var CoreDIContainer = new Container();

// Scene
CoreDIContainer.bind<ISceneView>(CORE_TYPES.ISceneView)
  .to(SceneView)
  .inSingletonScope();
CoreDIContainer.bind(SceneViewModel).toSelf().inSingletonScope();
CoreDIContainer.bind<IScenePresenter>(CORE_TYPES.IScenePresenter)
  .to(ScenePresenter)
  .inSingletonScope();

// Navigation
CoreDIContainer.bind<INavigation>(CORE_TYPES.INavigation)
  .to(Navigation)
  .inSingletonScope();
CoreDIContainer.bind(NavigationConfiguration).toSelf();

// Controllers
CoreDIContainer.bind<ILoadWorldController>(CORE_TYPES.ILoadWorldController)
  .to(LoadWorldController)
  .inSingletonScope();

// bind other CreateSceneClass here for testing puposes -MK
CoreDIContainer.bind<ICreateSceneClass>(CORE_TYPES.ICreateSceneClass).to(
  MainScene
);

CoreDIContainer.load(infrastructureDIContainer);
CoreDIContainer.load(useCaseDIContainer);
CoreDIContainer.load(PortsDIContainer);
CoreDIContainer.load(BuilderDIContainer);

export default CoreDIContainer;
