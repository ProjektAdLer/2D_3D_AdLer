import { Container } from "inversify";
import CORE_TYPES from "./CoreTypes";
import ScenePresenter from "../Presentation/Babylon/SceneManagement/ScenePresenter";
import AbstractSceneDefinition from "../Presentation/Babylon/SceneManagement/Scenes/AbstractSceneDefinition";
import IScenePresenter from "../Presentation/Babylon/SceneManagement/IScenePresenter";
import infrastructureDIContainer from "./InfrastructureDIContainer";
import UseCaseDIContainer from "./UseCases/UseCaseDIConatiner";
import PortsDIContainer from "./Ports/PortsDIContainer";
import BuilderDIContainer from "./Builders/BuilderDIContainer";
import INavigation from "../Presentation/Babylon/Navigation/INavigation";
import Navigation from "../Presentation/Babylon/Navigation/Navigation";
import NavigationConfiguration from "../Presentation/Babylon/Navigation/NavigationConfiguration";
import SpaceSceneDefinition from "../Presentation/Babylon/SceneManagement/Scenes/SpaceSceneDefinition";

const CoreDIContainer = new Container();

// Scene
CoreDIContainer.bind<IScenePresenter>(CORE_TYPES.IScenePresenter)
  .to(ScenePresenter)
  .inSingletonScope();

// Navigation
CoreDIContainer.bind<INavigation>(CORE_TYPES.INavigation)
  .to(Navigation)
  .inSingletonScope();

CoreDIContainer.bind(NavigationConfiguration).toSelf();

// bind other CreateSceneClass here for testing puposes -MK
CoreDIContainer.bind<AbstractSceneDefinition>(
  CORE_TYPES.AbstractSceneDefinition
).to(SpaceSceneDefinition);

CoreDIContainer.load(infrastructureDIContainer);
CoreDIContainer.load(UseCaseDIContainer);
CoreDIContainer.load(PortsDIContainer);
CoreDIContainer.load(BuilderDIContainer);

export default CoreDIContainer;
