import { LoadWorldController } from "../Presentation/React/LoadWorldButton/LoadWorldController";
import ILoadWorldController from "../Presentation/React/LoadWorldButton/ILoadWorldController";
import { Container } from "inversify";
import CORE_TYPES from "./CoreTypes";
import ISceneView from "../Presentation/Babylon/SceneManagment/ISceneView";
import SceneView from "../Presentation/Babylon/SceneManagment/SceneView";
import SceneViewModel from "../Presentation/Babylon/SceneManagment/SceneViewModel";
import SceneController from "../Presentation/Babylon/SceneManagment/SceneController";
import MainScene from "../Presentation/Babylon/SceneManagment/MainScene";
import ICreateSceneClass from "../Presentation/Babylon/SceneManagment/ICreateSceneClass";
import ILearningElementView from "../Presentation/Babylon/LearningElement/ILearningElementView";
import LearningElementView from "../Presentation/Babylon/LearningElement/LearningElementView";
import LearningElementViewModel from "../Presentation/Babylon/LearningElement/LearningElementViewModel";
import ISceneController from "../Presentation/Babylon/SceneManagment/ISceneController";
import infrastructureDIContainer from "./InfrastructureDIContainer";
import IPresentationDirector from "../Presentation/PresentationBuilder/IPresentationDirector";
import PresentationDirector from "../Presentation/PresentationBuilder/PresentationDirector";
import LearningRoomBuilder from "../Presentation/Babylon/LearningRoom/LearningRoomBuilder";
import LearningElementBuilder from "../Presentation/Babylon/LearningElement/LearningElementBuilder";
import IPresentationBuilder from "../Presentation/PresentationBuilder/IPresentationBuilder";
import useCaseDIContainer from "./UseCases/UseCaseDIConatiner";
import PortsDIContainer from "./Ports/PortsDIContainer";
import LearningElementModalViewModel from "../Presentation/React/LearningElementModal/LearningElementModalViewModel";
import ILearningElementModalPresenter from "../Presentation/React/LearningElementModal/ILearningElementModalPresenter";
import LearningElementModalPresenter from "../Presentation/React/LearningElementModal/LearningElementModalPresenter";
import LearningElementModalBuilder from "../Presentation/React/LearningElementModal/LearningElementModalBuilder";
import DoorBuilder from "../Presentation/Babylon/Door/DoorBuilder";
import ScorePanelBuilder from "../Presentation/React/ScorePanel/ScorePanelBuilder";
import MoodleLoginFormPresenterBuilder from "../Presentation/React/ReactAdvancedComponents/MoodleLoginForm/MoodleLoginFormBuilder";

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

CoreDIContainer.bind<IPresentationDirector>(
  CORE_TYPES.IPresentationDirector
).to(PresentationDirector);
CoreDIContainer.bind<IPresentationBuilder>(CORE_TYPES.ILearningRoomBuilder).to(
  LearningRoomBuilder
);

CoreDIContainer.bind<IPresentationBuilder>(
  CORE_TYPES.ILearningElementBuilder
).to(LearningElementBuilder);

// bind other CreateSceneClass here for testing puposes -MK
CoreDIContainer.bind<ICreateSceneClass>(CORE_TYPES.ICreateSceneClass).to(
  MainScene
);

CoreDIContainer.bind<IPresentationBuilder>(
  CORE_TYPES.ILearningElementModalBuilder
).to(LearningElementModalBuilder);

CoreDIContainer.bind<IPresentationBuilder>(CORE_TYPES.IDoorBuilder).to(
  DoorBuilder
);
CoreDIContainer.bind<IPresentationBuilder>(CORE_TYPES.IScorePanelBuilder).to(
  ScorePanelBuilder
);
CoreDIContainer.bind<MoodleLoginFormPresenterBuilder>(
  CORE_TYPES.IMoodleLoginFormBuilder
)
  .to(MoodleLoginFormPresenterBuilder)
  .inSingletonScope();

CoreDIContainer.load(infrastructureDIContainer);
CoreDIContainer.load(useCaseDIContainer);
CoreDIContainer.load(PortsDIContainer);

export default CoreDIContainer;
