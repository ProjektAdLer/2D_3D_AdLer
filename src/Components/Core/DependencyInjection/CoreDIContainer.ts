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
import DataTransferObject from "../Entities/ExternalRoomData";
import IRoomConfigurator from "../BusinessLogic/RoomConfigurator/IRoomConfigurator";
import RoomConfigurator from "../BusinessLogic/RoomConfigurator/RoomConfigurator";
import IRoomPresenter from "../Presentation/Room/IRoomPresenter";
import RoomPresenter from "../Presentation/Room/RoomPresenter";
import MainScene from "../Presentation/SceneManagment/MainScene";
import ICreateSceneClass from "../Presentation/SceneManagment/ICreateSceneClass";
import IRoomView from "../Presentation/Room/IRoomView";
import RoomView from "../Presentation/Room/RoomView";
import RoomViewModel from "../Presentation/Room/RoomViewModel";
import IMoodle from "../BusinessLogic/Moodle/IMoodle";
import Moodle from "../BusinessLogic/Moodle/Moodle";
import MoodleDataAccess from "../DataAccess/Moodle/MoodleDataAccess";
import IMoodleDataAccess from "../DataAccess/Moodle/IMoodleDataAccess";
import MoodleData from "../Entities/MoodleData";
import ILearningElementView from "../Presentation/LearningElement/ILearningElementView";
import LearningElementView from "../Presentation/LearningElement/LearningElementView";
import LearningElementViewModel from "../Presentation/LearningElement/LearningElementViewModel";
import ILearningElementPresenter from "../Presentation/LearningElement/ILearningElementPresenter";
import LearningElementPresenter from "../Presentation/LearningElement/LearningElementPresenter";
import IScenePresenter from "../Presentation/SceneManagment/IScenePresenter";
import reactContainerModule from "../../React/DependencyInjection/ReactDIContainer";
import ILearningElementFactory from "../Presentation/LearningElement/ILearningElementFactory";
import LearningElementFactory from "../Presentation/LearningElement/LearningElementFactory";
import IEntityManager from "../BusinessLogic/EntityManager/IEntityManager";
import REACT_TYPES from "../../React/DependencyInjection/ReactTypes";
import EntityManager from "../BusinessLogic/EntityManager/EntityManager";
import INewEntityManager from "../BusinessLogic/EntityManager/NewEntityManager/INewEntityManager";
import NewEntityManager from "../BusinessLogic/EntityManager/NewEntityManager/NewEntityManager";

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
CoreDIContainer.bind<IRoomConfigurator>(CORE_TYPES.IRoomConfigurator)
  .to(RoomConfigurator)
  .inSingletonScope();
CoreDIContainer.bind<IRoomPresenter>(CORE_TYPES.IRoomPresenter)
  .to(RoomPresenter)
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
CoreDIContainer.bind<IEntityManager>(REACT_TYPES.IEntityManager)
  .to(EntityManager)
  .inSingletonScope();

CoreDIContainer.bind<INewEntityManager>(CORE_TYPES.INewEntityManager)
  .to(NewEntityManager)
  .inSingletonScope();

CoreDIContainer.load(reactContainerModule);

export default CoreDIContainer;
