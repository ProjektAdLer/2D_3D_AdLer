import { Container } from "inversify";
import CORE_TYPES from "./CoreTypes";
import infrastructureDIContainer from "./InfrastructureDIContainer";
import UseCaseDIContainer from "./UseCases/UseCaseDIConatiner";
import PortsDIContainer from "./Ports/PortsDIContainer";
import BuilderDIContainer from "./Builders/BuilderDIContainer";
import INavigation from "../Presentation/Babylon/Navigation/INavigation";
import Navigation from "../Presentation/Babylon/Navigation/Navigation";
import NavigationConfiguration from "../Presentation/Babylon/Navigation/NavigationConfiguration";
import ScenesDIContainer from "./Scenes/ScenesDIContainer";
import PresentationDIContainer from "./Presentation/PresentationDIContainer";

const CoreDIContainer = new Container();

// Navigation
CoreDIContainer.bind<INavigation>(CORE_TYPES.INavigation)
  .to(Navigation)
  .inSingletonScope();

CoreDIContainer.bind(NavigationConfiguration).toSelf();

CoreDIContainer.load(infrastructureDIContainer);
CoreDIContainer.load(UseCaseDIContainer);
CoreDIContainer.load(PortsDIContainer);
CoreDIContainer.load(BuilderDIContainer);
CoreDIContainer.load(ScenesDIContainer);
CoreDIContainer.load(PresentationDIContainer);

export default CoreDIContainer;
