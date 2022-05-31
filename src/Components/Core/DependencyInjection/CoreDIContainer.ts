import { LoadWorldController } from "../Presentation/React/LoadWorldButton/LoadWorldController";
import ILoadWorldController from "../Presentation/React/LoadWorldButton/ILoadWorldController";
import { Container } from "inversify";
import CORE_TYPES from "./CoreTypes";
import ISceneView from "../Presentation/Babylon/SceneManagement/ISceneView";
import SceneView from "../Presentation/Babylon/SceneManagement/SceneView";
import SceneViewModel from "../Presentation/Babylon/SceneManagement/SceneViewModel";
import SceneController from "../Presentation/Babylon/SceneManagement/SceneController";
import MainScene from "../Presentation/Babylon/SceneManagement/MainScene";
import ICreateSceneClass from "../Presentation/Babylon/SceneManagement/ICreateSceneClass";
import ILearningElementView from "../Presentation/Babylon/LearningElement/ILearningElementView";
import LearningElementView from "../Presentation/Babylon/LearningElement/LearningElementView";
import LearningElementViewModel from "../Presentation/Babylon/LearningElement/LearningElementViewModel";
import ISceneController from "../Presentation/Babylon/SceneManagement/ISceneController";
import infrastructureDIContainer from "./InfrastructureDIContainer";
import useCaseDIContainer from "./UseCases/UseCaseDIConatiner";
import PortsDIContainer from "./Ports/PortsDIContainer";
import BuilderDIContainer from "./Builders/BuilderDIContainer";

var CoreDIContainer = new Container();

// Scene
CoreDIContainer.bind<ISceneView>(CORE_TYPES.ISceneView)
  .to(SceneView)
  .inSingletonScope();
CoreDIContainer.bind(SceneViewModel).toSelf().inSingletonScope();
CoreDIContainer.bind<ISceneController>(CORE_TYPES.ISceneController)
  .to(SceneController)
  .inSingletonScope();

// Learning Element
CoreDIContainer.bind<ILearningElementView>(CORE_TYPES.ILearningElementView).to(
  LearningElementView
);
CoreDIContainer.bind(LearningElementViewModel).toSelf();

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
