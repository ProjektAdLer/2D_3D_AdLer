import { LoadWorldController } from "../Presentation/LoadWorldButton/LoadWorldController";
import ILoadWorldController from "../Presentation/LoadWorldButton/ILoadWorldController";
import ILoadWorldUseCase from "../Application/LoadWorld/ILoadWorldUseCase";
import { Container } from "inversify";
import CORE_TYPES from "./CoreTypes";
import IPresentation from "../Presentation/API/IPresentation";
import Presentation from "../Presentation/API/Presentation";
import ICore from "../API/ICore";
import Core from "../API/Core";
import IEngineManager from "../Presentation/EngineManager/IEngineManager";
import EngineManager from "../Presentation/EngineManager/EngineManager";
import ISceneView from "../Presentation/SceneManagment/ISceneView";
import SceneView from "../Presentation/SceneManagment/SceneView";
import SceneViewModel from "../Presentation/SceneManagment/SceneViewModel";
import SceneController from "../Presentation/SceneManagment/SceneController";
import DataTransferObject from "../Domain/Entities/ExternalRoomData";
import ILearningRoomController from "../Presentation/LearningRoom/ILearningRoomController";
import LearningRoomController from "../Presentation/LearningRoom/LearningRoomController";
import MainScene from "../Presentation/SceneManagment/MainScene";
import ICreateSceneClass from "../Presentation/SceneManagment/ICreateSceneClass";
import LearningRoomView from "../Presentation/LearningRoom/LearningRoomView";
import LearningRoomViewModel from "../Presentation/LearningRoom/LearningRoomViewModel";
import IMoodle from "../Application/Moodle/IMoodle";
import Moodle from "../Application/Moodle/Moodle";
import MoodleDataAccess from "../DataAccess/Moodle/MoodleDataAccess";
import IMoodleDataAccess from "../DataAccess/Moodle/IMoodleDataAccess";
import MoodleData from "../Domain/Entities/MoodleData";
import ILearningElementView from "../Presentation/LearningElement/ILearningElementView";
import LearningElementView from "../Presentation/LearningElement/LearningElementView";
import LearningElementViewModel from "../Presentation/LearningElement/LearningElementViewModel";
import ILearningElementController from "../Presentation/LearningElement/ILearningElementController";
import LearningElementController from "../Presentation/LearningElement/LearningElementController";
import ILearningElementPanelPresenter from "../Presentation/LearningElementPanel/ILearningElementPanelPresenter";
import LearningElementPanelPresenter from "../Presentation/LearningElementPanel/LearningElementPanelPresenter";
import LearningElementPanelViewModel from "../Presentation/LearningElementPanel/LearningElementPanelViewModel";
import LoadWorldUseCase from "../Application/LoadWorld/LoadWorldUseCase";
import IDataAccess from "../DataAccess/API/IDataAccess";
import DataAccess from "../DataAccess/API/DataAccess";
import ISceneController from "../Presentation/SceneManagment/ISceneController";
import ILearningWorldPort from "../Application/LoadWorld/ILearningWorldPort";
import LearningWorldPresenter from "../Presentation/LearningWorld/LearningWorldPresenter";
import infrastructureDIContainer from "./InfrastructureDIContainer";
import ILearningRoomPort from "../Presentation/LearningRoom/ILearningRoomPort";
import LearningRoomPresenter from "../Presentation/LearningRoom/LearningRoomPresenter";
import IPresentationDirector from "../Presentation/PresentationBuilder/IPresentationDirector";
import PresentationDirector from "../Presentation/PresentationBuilder/PresentationDirector";
import LearningRoomBuilder from "../Presentation/PresentationBuilder/LearningRoomBuilder";

var CoreDIContainer = new Container();

// API classes
CoreDIContainer.bind<ICore>(CORE_TYPES.ICore).to(Core).inSingletonScope();
CoreDIContainer.bind<IPresentation>(CORE_TYPES.IPresentation)
  .to(Presentation)
  .inSingletonScope();
CoreDIContainer.bind<IDataAccess>(CORE_TYPES.IDataAccess)
  .to(DataAccess)
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

// DTO
CoreDIContainer.bind(DataTransferObject).toSelf();

// Room
// CoreDIContainer.bind<ILearningRoomController>(
//   CORE_TYPES.ILearningRoomController
// )
//   .to(LearningRoomController)
//   .inSingletonScope();
// CoreDIContainer.bind<ILearningRoomView>(CORE_TYPES.ILearningRoomView).to(
//   LearningRoomView
// );
// CoreDIContainer.bind(LearningRoomViewModel).toSelf();

// Moodle
CoreDIContainer.bind<IMoodle>(CORE_TYPES.IMoodle).to(Moodle).inSingletonScope();
CoreDIContainer.bind<IMoodleDataAccess>(CORE_TYPES.IMoodleDataAccess)
  .to(MoodleDataAccess)
  .inSingletonScope();
// No Singleton here - PG
CoreDIContainer.bind<MoodleData>(CORE_TYPES.MoodleData).to(MoodleData);

// Learning Element
CoreDIContainer.bind<ILearningElementController>(
  CORE_TYPES.ILearingElementPresenter
).to(LearningElementController);
CoreDIContainer.bind<ILearningElementView>(CORE_TYPES.ILearningElementView).to(
  LearningElementView
);
CoreDIContainer.bind(LearningElementViewModel).toSelf();

// Learning Element Panel
CoreDIContainer.bind<ILearningElementPanelPresenter>(
  CORE_TYPES.ILearningElementPanelPresenter
).to(LearningElementPanelPresenter);
CoreDIContainer.bind(LearningElementPanelViewModel).toSelf();

// Controllers
CoreDIContainer.bind<ILoadWorldController>(CORE_TYPES.ILoadWorldController)
  .to(LoadWorldController)
  .inSingletonScope();

// Use Cases
// Use Cases always have to be Singleton
CoreDIContainer.bind<ILoadWorldUseCase>(CORE_TYPES.ILoadWorldUseCase)
  .to(LoadWorldUseCase)
  .inSingletonScope();

CoreDIContainer.bind<ILearningWorldPort>(CORE_TYPES.ILearningWorldPort)
  .to(LearningWorldPresenter)
  .inSingletonScope();

CoreDIContainer.bind<ILearningRoomPort>(CORE_TYPES.ILearningRoomPort)
  .to(LearningRoomPresenter)
  .inSingletonScope();

// Presentation Builder Pattern
CoreDIContainer.bind<IPresentationDirector>(
  CORE_TYPES.IPresentationDirector
).to(PresentationDirector);
CoreDIContainer.bind(LearningRoomBuilder).toSelf();

CoreDIContainer.load(infrastructureDIContainer);

export default CoreDIContainer;
