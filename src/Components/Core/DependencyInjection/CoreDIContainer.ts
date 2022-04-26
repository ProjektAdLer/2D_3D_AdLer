import { LoadWorldController } from "../Presentation/LoadWorldButton/LoadWorldController";
import ILoadWorldController from "../Presentation/LoadWorldButton/ILoadWorldController";
import ILoadWorld from "./../Application/LoadWorld/ILoadWorld";
import { Container } from "inversify";
import CORE_TYPES from "./CoreTypes";
import IPresentation from "../Presentation/API/IPresentation";
import Presentation from "../Presentation/API/Presentation";
import IBusinessLogic from "../Presentation/API/IBusinessLogic";
import BusinessLogic from "../BusinessLogic/API/BusinessLogic";
import IDataAccess from "./../BusinessLogic/API/IDataAccess";
import DataAccess from "../DataAccess/API/DataAccess";
import ICore from "../API/ICore";
import Core from "../API/Core";
import IEngineManager from "../Presentation/EngineManager/IEngineManager";
import EngineManager from "../Presentation/EngineManager/EngineManager";
import ISceneView from "../Presentation/SceneManagment/ISceneView";
import SceneView from "../Presentation/SceneManagment/SceneView";
import SceneViewModel from "../Presentation/SceneManagment/SceneViewModel";
import ScenePresenter from "../Presentation/SceneManagment/ScenePresenter";
import DataTransferObject from "../Domain/Entities/ExternalRoomData";
import IRoomController from "../Presentation/Room/IRoomController";
import RoomController from "../Presentation/Room/RoomController";
import MainScene from "../Presentation/SceneManagment/MainScene";
import ICreateSceneClass from "../Presentation/SceneManagment/ICreateSceneClass";
import IRoomView from "../Presentation/Room/IRoomView";
import RoomView from "../Presentation/Room/RoomView";
import RoomViewModel from "../Presentation/Room/RoomViewModel";
import IMoodle from "../BusinessLogic/Moodle/IMoodle";
import Moodle from "../BusinessLogic/Moodle/Moodle";
import MoodleDataAccess from "../DataAccess/Moodle/MoodleDataAccess";
import IMoodleDataAccess from "../DataAccess/Moodle/IMoodleDataAccess";
import MoodleData from "../Domain/Entities/MoodleData";
import ILearningElementView from "../Presentation/LearningElement/ILearningElementView";
import LearningElementView from "../Presentation/LearningElement/LearningElementView";
import LearningElementViewModel from "../Presentation/LearningElement/LearningElementViewModel";
import ILearningElementPresenter from "../Presentation/LearningElement/ILearningElementPresenter";
import LearningElementPresenter from "../Presentation/LearningElement/LearningElementPresenter";
import IScenePresenter from "../Presentation/SceneManagment/IScenePresenter";
import ILearningElementFactory from "../Presentation/LearningElement/ILearningElementFactory";
import LearningElementFactory from "../Presentation/LearningElement/LearningElementFactory";
import EntityManager from "../Domain/EntityManager/EntityManager";
import IReactEntry from "../Presentation/ReactBaseComponents/IReactEntry";
import ReactEntry from "../Presentation/ReactBaseComponents/ReactEntry";
import ILearningElementPanelPresenter from "../Presentation/LearningElementPanel/ILearningElementPanelPresenter";
import LearningElementPanelPresenter from "../Presentation/LearningElementPanel/LearningElementPanelPresenter";
import LearningElementPanelViewModel from "../Presentation/LearningElementPanel/LearningElementPanelViewModel";
import IViewModelProvider from "../Presentation/ViewModelProvider/IViewModelProvider";
import ViewModelProvider from "../Presentation/ViewModelProvider/ViewModelProvider";
import LoadWorld from "../Application/LoadWorld/LoadWorld";
import IEntityManager from "../Domain/EntityManager/IEntityManager";

var CoreDIContainer = new Container();

// API classes
CoreDIContainer.bind<ICore>(CORE_TYPES.ICore).to(Core).inSingletonScope();
CoreDIContainer.bind<IPresentation>(CORE_TYPES.IPresentation)
  .to(Presentation)
  .inSingletonScope();
CoreDIContainer.bind<IBusinessLogic>(CORE_TYPES.IBusinessLogic)
  .to(BusinessLogic)
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
CoreDIContainer.bind<IScenePresenter>(CORE_TYPES.IScenePresenter)
  .to(ScenePresenter)
  .inSingletonScope();
// bind other CreateSceneClass here for testing puposes -MK
CoreDIContainer.bind<ICreateSceneClass>(CORE_TYPES.ICreateSceneClass).to(
  MainScene
);

// DTO
CoreDIContainer.bind(DataTransferObject).toSelf();

// Room
CoreDIContainer.bind<IRoomController>(CORE_TYPES.IRoomController)
  .to(RoomController)
  .inSingletonScope();
CoreDIContainer.bind<IRoomView>(CORE_TYPES.IRoomView).to(RoomView);
CoreDIContainer.bind(RoomViewModel).toSelf();

// Moodle
CoreDIContainer.bind<IMoodle>(CORE_TYPES.IMoodle).to(Moodle).inSingletonScope();
CoreDIContainer.bind<IMoodleDataAccess>(CORE_TYPES.IMoodleDataAccess)
  .to(MoodleDataAccess)
  .inSingletonScope();
// No Singleton here - PG
CoreDIContainer.bind<MoodleData>(CORE_TYPES.MoodleData).to(MoodleData);

// Learning Element
CoreDIContainer.bind<ILearningElementFactory>(
  CORE_TYPES.ILearningElementFactory
)
  .to(LearningElementFactory)
  .inSingletonScope();
CoreDIContainer.bind<ILearningElementPresenter>(
  CORE_TYPES.ILearingElementPresenter
).to(LearningElementPresenter);
CoreDIContainer.bind<ILearningElementView>(CORE_TYPES.ILearingElementView).to(
  LearningElementView
);
CoreDIContainer.bind(LearningElementViewModel).toSelf();

// Entity Manager
CoreDIContainer.bind<IEntityManager>(CORE_TYPES.IEntityManager)
  .to(EntityManager)
  .inSingletonScope();

// React Entry
CoreDIContainer.bind<IReactEntry>(CORE_TYPES.ICoreRenderer)
  .to(ReactEntry)
  .inSingletonScope();

// Learning Element Panel
CoreDIContainer.bind<ILearningElementPanelPresenter>(
  CORE_TYPES.ILearningElementPanelPresenter
).to(LearningElementPanelPresenter);
CoreDIContainer.bind(LearningElementPanelViewModel).toSelf();

// View Model Provider
CoreDIContainer.bind<IViewModelProvider>(CORE_TYPES.IViewModelProvider)
  .to(ViewModelProvider)
  .inSingletonScope();

// Controllers
CoreDIContainer.bind<ILoadWorldController>(CORE_TYPES.ILoadWorldController)
  .to(LoadWorldController)
  .inSingletonScope();

// Use Cases
// Use Cases always have to be Singleton
CoreDIContainer.bind<ILoadWorld>(CORE_TYPES.ILoadWorld)
  .to(LoadWorld)
  .inSingletonScope();

export default CoreDIContainer;
