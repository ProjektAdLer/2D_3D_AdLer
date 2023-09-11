import { ContainerModule } from "inversify";
import CalculateLearningSpaceScoreUseCase from "../../Application/UseCases/CalculateLearningSpaceScore/CalculateLearningSpaceScoreUseCase";
import ICalculateLearningSpaceScoreUseCase from "../../Application/UseCases/CalculateLearningSpaceScore/ICalculateLearningSpaceScoreUseCase";
import ILoadLearningElementUseCase from "../../Application/UseCases/LoadLearningElement/ILoadLearningElementUseCase";
import LoadLearningElementUseCase from "../../Application/UseCases/LoadLearningElement/LoadLearningElementUseCase";
import ILoadAvatarUseCase from "../../Application/UseCases/LoadAvatar/ILoadAvatarUseCase";
import LoadAvatarUseCase from "../../Application/UseCases/LoadAvatar/LoadAvatarUseCase";
import ILoadLearningSpaceUseCase from "../../Application/UseCases/LoadLearningSpace/ILoadLearningSpaceUseCase";
import LoadLearningSpaceUseCase from "../../Application/UseCases/LoadLearningSpace/LoadLearningSpaceUseCase";
import ILoadLearningWorldUseCase from "../../Application/UseCases/LoadLearningWorld/ILoadLearningWorldUseCase";
import LoadLearningWorldUseCase from "../../Application/UseCases/LoadLearningWorld/LoadLearningWorldUseCase";
import ILoginUseCase from "../../Application/UseCases/Login/ILoginUseCase";
import LoginUseCase from "../../Application/UseCases/Login/LoginUseCase";
import IScoreLearningElementUseCase from "../../Application/UseCases/ScoreLearningElement/IScoreLearningElementUseCase";
import ScoreLearningElementUseCase from "../../Application/UseCases/ScoreLearningElement/ScoreLearningElementUseCase";
import USECASE_TYPES from "./USECASE_TYPES";
import IScoreH5PElementUseCase from "../../Application/UseCases/ScoreH5PLearningElement/IScoreH5PLearningElementUseCase";
import ScoreH5PElementUseCase from "../../Application/UseCases/ScoreH5PLearningElement/ScoreH5PLearningElementUseCase";
import IGetLearningElementSourceUseCase from "../../Application/UseCases/GetLearningElementSource/IGetLearningElementSourceUseCase";
import GetLearningElementSourceUseCase from "../../Application/UseCases/GetLearningElementSource/GetLearningElementSourceUseCase";
import ILoadUserLearningWorldsUseCase from "../../Application/UseCases/LoadUserLearningWorlds/ILoadUserLearningWorldsUseCase";
import LoadUserLearningWorldsUseCase from "../../Application/UseCases/LoadUserLearningWorlds/LoadUserLearningWorldsUseCase";
import IGetLoginStatusUseCase from "../../Application/UseCases/GetLoginStatus/IGetLoginStatusUseCase";
import GetLoginStatusUseCase from "../../Application/UseCases/GetLoginStatus/GetLoginStatusUseCase";
import SetUserLocationUseCase from "../../Application/UseCases/SetUserLocation/SetUserLocationUseCase";
import ISetUserLocationUseCase from "../../Application/UseCases/SetUserLocation/ISetUserLocationUseCase";
import IGetUserLocationUseCase from "../../Application/UseCases/GetUserLocation/IGetUserLocationUseCase";
import GetUserLocationUseCase from "../../Application/UseCases/GetUserLocation/GetUserLocationUseCase";
import CalculateLearningWorldScoreUseCase from "../../Application/UseCases/CalculateLearningWorldScore/CalculateLearningWorldScoreUseCase";
import ICalculateLearningWorldScoreUseCase from "../../Application/UseCases/CalculateLearningWorldScore/ICalculateLearningWorldScoreUseCase";
import ICalculateLearningSpaceAvailabilityUseCase from "../../Application/UseCases/CalculateLearningSpaceAvailability/ICalculateLearningSpaceAvailabilityUseCase";
import CalculateLearningSpaceAvailabilityUseCase from "../../Application/UseCases/CalculateLearningSpaceAvailability/CalculateLearningSpaceAvailabilityUseCase";
import IGetLearningSpacePrecursorAndSuccessorUseCase from "../../Application/UseCases/GetLearningSpacePrecursorAndSuccessor/IGetLearningSpacePrecursorAndSuccessorUseCase";
import GetLearningSpacePrecursorAndSuccessorUseCase from "../../Application/UseCases/GetLearningSpacePrecursorAndSuccessor/GetLearningSpacePrecursorAndSuccessorUseCase";
import ILoadAdaptivityElementUseCase from "../../Application/UseCases/Adaptivity/LoadAdaptivityElementUseCase/ILoadAdaptivityElementUseCase";
import LoadAdaptivityElementUseCase from "../../Application/UseCases/Adaptivity/LoadAdaptivityElementUseCase/LoadAdaptivityElementUseCase";
import ISubmitAdaptivityElementSelectionUseCase from "../../Application/UseCases/Adaptivity/SubmitAdaptivityElementSelectionUseCase/ISubmitAdaptivityElementSelectionUseCase";
import SubmitAdaptivityElementSelectionUseCase from "../../Application/UseCases/Adaptivity/SubmitAdaptivityElementSelectionUseCase/SubmitAdaptivityElementSelectionUseCase";
import StartOverallTimeSpentNotificationTimerUseCase from "../../Application/UseCases/Adaptivity/OverallTimeSpentNotification/StartOverallTimeSpentNotificationTimerUseCase/StartOverallTimeSpentNotificationTimerUseCase";
import IStartOverallTimeSpentNotificationTimerUseCase from "../../Application/UseCases/Adaptivity/OverallTimeSpentNotification/StartOverallTimeSpentNotificationTimerUseCase/IStartOverallTimeSpentNotificationTimerUseCase";
import ICreateOverallTimeSpentNotificationTimerUseCase from "../../Application/UseCases/Adaptivity/OverallTimeSpentNotification/CreateOverallTimeSpentNotificationTimerUseCase/ICreateOverallTimeSpentNotificationTimerUseCase";
import CreateOverallTimeSpentNotificationUseCase from "../../Application/UseCases/Adaptivity/OverallTimeSpentNotification/CreateOverallTimeSpentNotificationTimerUseCase/CreateOverallTimeSpentNotificationTimerUseCase";
import IPauseOverallTimeSpentNotificationTimerUseCase from "../../Application/UseCases/Adaptivity/OverallTimeSpentNotification/PauseOverallTimeSpentNotificationTimerUseCase/IPauseOverallTimeSpentNotificationTimerUseCase";
import PauseOverallTimeSpentNotificationTimerUseCase from "../../Application/UseCases/Adaptivity/OverallTimeSpentNotification/PauseOverallTimeSpentNotificationTimerUseCase/PauseOverallTimeSpentNotificationTimerUseCase";

const UseCaseDIContainer = new ContainerModule((bind) => {
  // Use Cases
  // Use Cases always have to be Singleton
  bind<ILoadUserLearningWorldsUseCase>(
    USECASE_TYPES.ILoadUserLearningWorldsUseCase
  )
    .to(LoadUserLearningWorldsUseCase)
    .inSingletonScope();

  bind<ILoadLearningWorldUseCase>(USECASE_TYPES.ILoadLearningWorldUseCase)
    .to(LoadLearningWorldUseCase)
    .inSingletonScope();

  bind<ILoadAvatarUseCase>(USECASE_TYPES.ILoadAvatarUseCase)
    .to(LoadAvatarUseCase)
    .inSingletonScope();

  bind<IScoreLearningElementUseCase>(USECASE_TYPES.IScoreLearningElementUseCase)
    .to(ScoreLearningElementUseCase)
    .inSingletonScope();

  bind<ILoadLearningElementUseCase>(USECASE_TYPES.ILoadLearningElementUseCase)
    .to(LoadLearningElementUseCase)
    .inSingletonScope();

  bind<ICalculateLearningSpaceScoreUseCase>(
    USECASE_TYPES.ICalculateLearningSpaceScoreUseCase
  )
    .to(CalculateLearningSpaceScoreUseCase)
    .inSingletonScope();

  bind<ICalculateLearningWorldScoreUseCase>(
    USECASE_TYPES.ICalculateLearningWorldScoreUseCase
  )
    .to(CalculateLearningWorldScoreUseCase)
    .inSingletonScope();

  bind<ILoginUseCase>(USECASE_TYPES.ILoginUseCase)
    .to(LoginUseCase)
    .inSingletonScope();

  bind<ILoadLearningSpaceUseCase>(USECASE_TYPES.ILoadLearningSpaceUseCase)
    .to(LoadLearningSpaceUseCase)
    .inSingletonScope();

  bind<IScoreH5PElementUseCase>(USECASE_TYPES.IScoreH5PLearningElementUseCase)
    .to(ScoreH5PElementUseCase)
    .inSingletonScope();

  bind<IGetLearningElementSourceUseCase>(
    USECASE_TYPES.IGetLearningElementSourceUseCase
  )
    .to(GetLearningElementSourceUseCase)
    .inSingletonScope();

  bind<IGetLoginStatusUseCase>(USECASE_TYPES.IGetLoginStatusUseCase)
    .to(GetLoginStatusUseCase)
    .inSingletonScope();

  bind<ISetUserLocationUseCase>(USECASE_TYPES.ISetUserLocationUseCase)
    .to(SetUserLocationUseCase)
    .inSingletonScope();

  bind<IGetUserLocationUseCase>(USECASE_TYPES.IGetUserLocationUseCase)
    .to(GetUserLocationUseCase)
    .inSingletonScope();

  bind<ICalculateLearningSpaceAvailabilityUseCase>(
    USECASE_TYPES.ICalculateLearningSpaceAvailabilityUseCase
  )
    .to(CalculateLearningSpaceAvailabilityUseCase)
    .inSingletonScope();
  bind<IGetLearningSpacePrecursorAndSuccessorUseCase>(
    USECASE_TYPES.IGetLearningSpacePrecursorAndSuccessorUseCase
  )
    .to(GetLearningSpacePrecursorAndSuccessorUseCase)
    .inSingletonScope();

  bind<ILoadAdaptivityElementUseCase>(
    USECASE_TYPES.ILoadAdaptivityElementUseCase
  )
    .to(LoadAdaptivityElementUseCase)
    .inSingletonScope();

  bind<ISubmitAdaptivityElementSelectionUseCase>(
    USECASE_TYPES.ISubmitAdaptivityElementSelectionUseCase
  )
    .to(SubmitAdaptivityElementSelectionUseCase)
    .inSingletonScope();

  bind<IStartOverallTimeSpentNotificationTimerUseCase>(
    USECASE_TYPES.IStartOverallTimeSpentNotificationTimerUseCase
  )
    .to(StartOverallTimeSpentNotificationTimerUseCase)
    .inSingletonScope();

  bind<ICreateOverallTimeSpentNotificationTimerUseCase>(
    USECASE_TYPES.ICreateOverallTimeSpentNotificationTimerUseCase
  )
    .to(CreateOverallTimeSpentNotificationUseCase)
    .inSingletonScope();

  bind<IPauseOverallTimeSpentNotificationTimerUseCase>(
    USECASE_TYPES.IPauseOverallTimeSpentNotificationTimerUseCase
  )
    .to(PauseOverallTimeSpentNotificationTimerUseCase)
    .inSingletonScope();
});

export default UseCaseDIContainer;
