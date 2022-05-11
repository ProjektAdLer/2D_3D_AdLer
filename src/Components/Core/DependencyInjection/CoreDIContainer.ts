import { LoadWorldController } from "../Presentation/React/LoadWorldButton/LoadWorldController";
import ILoadWorldController from "../Presentation/React/LoadWorldButton/ILoadWorldController";
import { Container } from "inversify";
import CORE_TYPES from "./CoreTypes";
import IPresentation from "../Presentation/API/IPresentation";
import Presentation from "../Presentation/API/Presentation";
import ICore from "../API/ICore";
import Core from "../API/Core";
import IEngineManager from "../Presentation/Babylon/EngineManager/IEngineManager";
import EngineManager from "../Presentation/Babylon/EngineManager/EngineManager";
import ISceneView from "../Presentation/Babylon/SceneManagment/ISceneView";
import SceneView from "../Presentation/Babylon/SceneManagment/SceneView";
import SceneViewModel from "../Presentation/Babylon/SceneManagment/SceneViewModel";
import SceneController from "../Presentation/Babylon/SceneManagment/SceneController";
import MainScene from "../Presentation/Babylon/SceneManagment/MainScene";
import ICreateSceneClass from "../Presentation/Babylon/SceneManagment/ICreateSceneClass";
import ILearningElementView from "../Presentation/Babylon/LearningElement/ILearningElementView";
import LearningElementView from "../Presentation/Babylon/LearningElement/LearningElementView";
import LearningElementViewModel from "../Presentation/Babylon/LearningElement/LearningElementViewModel";
import ILearningElementController from "../Presentation/Babylon/LearningElement/ILearningElementController";
import LearningElementController from "../Presentation/Babylon/LearningElement/LearningElementController";
import ISceneController from "../Presentation/Babylon/SceneManagment/ISceneController";
import infrastructureDIContainer from "./InfrastructureDIContainer";
import LearningRoomPresenter from "../Presentation/Babylon/LearningRoom/LearningRoomPresenter";
import IPresentationDirector from "../Presentation/PresentationBuilder/IPresentationDirector";
import PresentationDirector from "../Presentation/PresentationBuilder/PresentationDirector";
import LearningRoomBuilder from "../Presentation/PresentationBuilder/LearningRoomBuilder";
import LearningElementBuilder from "../Presentation/PresentationBuilder/LearningElementBuilder";
import IPresentationBuilder from "../Presentation/PresentationBuilder/IPresentationBuilder";
import useCaseDIContainer from "./UseCases/UseCaseDIConatiner";
import ILearningElementPort from "../Application/LearningElementStarted/ILearningElementStartedPort";
import PortsDIContainer from "./Ports/PortsDIContainer";

var CoreDIContainer = new Container();

// API classes
CoreDIContainer.bind<ICore>(CORE_TYPES.ICore).to(Core).inSingletonScope();
CoreDIContainer.bind<IPresentation>(CORE_TYPES.IPresentation)
  .to(Presentation)
  .inSingletonScope();

// Engine
CoreDIContainer.bind<IEngineManager>(CORE_TYPES.IEngineManager)
  .to(EngineManager)
  .inSingletonScope();

// Scene
CoreDIContainer.bind<ISceneView>(CORE_TYPES.ISceneView)
  .to(SceneView)
  .inSingletonScope();
CoreDIContainer.bind(SceneViewModel).toSelf().inSingletonScope();
CoreDIContainer.bind<ISceneController>(CORE_TYPES.ISceneController)
  .to(SceneController)
  .inSingletonScope();

// bind other CreateSceneClass here for testing puposes -MK
CoreDIContainer.bind<ICreateSceneClass>(CORE_TYPES.ICreateSceneClass).to(
  MainScene
);

// Learning Element
CoreDIContainer.bind<ILearningElementController>(
  CORE_TYPES.ILearingElementPresenter
).to(LearningElementController);
CoreDIContainer.bind<ILearningElementView>(CORE_TYPES.ILearningElementView).to(
  LearningElementView
);
CoreDIContainer.bind(LearningElementViewModel).toSelf();

// Controllers
CoreDIContainer.bind<ILoadWorldController>(CORE_TYPES.ILoadWorldController)
  .to(LoadWorldController)
  .inSingletonScope();

// CoreDIContainer.bind<ILearningElementStartedPort>(CORE_TYPES.ILearningElementPort)
//   .to(LearningElementPort)
// Presentation Builder Pattern

CoreDIContainer.bind<IPresentationDirector>(
  CORE_TYPES.IPresentationDirector
).to(PresentationDirector);
CoreDIContainer.bind<IPresentationBuilder>(CORE_TYPES.ILearningRoomBuilder).to(
  LearningRoomBuilder
);
CoreDIContainer.bind<IPresentationBuilder>(
  CORE_TYPES.ILearningElementBuilder
).to(LearningElementBuilder);

CoreDIContainer.load(infrastructureDIContainer);
CoreDIContainer.load(useCaseDIContainer);
CoreDIContainer.load(PortsDIContainer);

export default CoreDIContainer;
