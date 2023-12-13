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
import ILoadUserInitialLearningWorldsInfoUseCase from "../../Application/UseCases/LoadUserInitialLearningWorldsInfo/ILoadUserInitialLearningWorldsInfoUseCase";
import LoadUserInitialLearningWorldsInfoUseCase from "../../Application/UseCases/LoadUserInitialLearningWorldsInfo/LoadUserInitialLearningWorldsInfoUseCase";
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
import StartOverallTimeSpentTimerUseCase from "../../Application/UseCases/Adaptivity/GetOverallTimeSpent/StartOverallTimeSpentTimer/StartOverallTimeSpentTimerUseCase";
import IStartOverallTimeSpentTimerUseCase from "../../Application/UseCases/Adaptivity/GetOverallTimeSpent/StartOverallTimeSpentTimer/IStartOverallTimeSpentTimerUseCase";
import ICreateOverallTimeSpentTimerUseCase from "../../Application/UseCases/Adaptivity/GetOverallTimeSpent/CreateOverallTimeSpentTimer/ICreateOverallTimeSpentTimerUseCase";
import CreateOverallTimeSpentUseCase from "../../Application/UseCases/Adaptivity/GetOverallTimeSpent/CreateOverallTimeSpentTimer/CreateOverallTimeSpentTimerUseCase";
import IPauseOverallTimeSpentTimerUseCase from "../../Application/UseCases/Adaptivity/GetOverallTimeSpent/PauseOverallTimeSpentTimer/IPauseOverallTimeSpentTimerUseCase";
import PauseOverallTimeSpentTimerUseCase from "../../Application/UseCases/Adaptivity/GetOverallTimeSpent/PauseOverallTimeSpentTimer/PauseOverallTimeSpentTimerUseCase";
import IGetAdaptivityElementStatusUseCase from "../../Application/UseCases/Adaptivity/GetAdaptivityElementStatusUseCase/IGetAdaptivityElementStatusUseCase";
import GetAdaptivityElementStatusUseCase from "../../Application/UseCases/Adaptivity/GetAdaptivityElementStatusUseCase/GetAdaptivityElementStatusUseCase";
import ILoadExternalLearningElementUseCase from "../../Application/UseCases/Adaptivity/LoadExternalLearningElementUseCase/ILoadExternalLearningElementUseCase";
import LoadExternalLearningElementUseCase from "../../Application/UseCases/Adaptivity/LoadExternalLearningElementUseCase/LoadExternalLearningElementUseCase";
import IScoreAdaptivityElementUseCase from "../../Application/UseCases/Adaptivity/ScoreAdaptivityElementUseCase/IScoreAdaptivityElementUseCase";
import ScoreAdaptivityElementUseCase from "../../Application/UseCases/Adaptivity/ScoreAdaptivityElementUseCase/ScoreAdaptivityElementUseCase";
import IDisplayLearningElementUseCase from "../../Application/UseCases/Adaptivity/DisplayLearningElementUseCase/IDisplayLearningElementUseCase";
import DisplayLearningElementUseCase from "../../Application/UseCases/Adaptivity/DisplayLearningElementUseCase/DisplayLearningElementUseCase";
import ILogoutUseCase from "../../Application/UseCases/Logout/ILogoutUseCase";
import LogoutUseCase from "../../Application/UseCases/Logout/LogoutUseCase";
import ILoadUserLearningWorldsInfoUseCase from "../../Application/UseCases/LoadUserLearningWorldsInfo/ILoadUserLearningWorldsInfoUseCase";
import LoadUserLearningWorldsInfoUseCase from "../../Application/UseCases/LoadUserLearningWorldsInfo/LoadUserLearningWorldsInfoUseCase";
import ISetWorldCompletionModalToShownUseCase from "../../Application/UseCases/SetWorldCompletionModalToShown/ISetWorldCompletionModalToShownUseCase";
import SetWorldCompletionModalToShownUseCase from "../../Application/UseCases/SetWorldCompletionModalToShown/SetWorldCompletionModalToShownUseCase";

const UseCaseDIContainer = new ContainerModule((bind) => {
  // Use Cases
  // Use Cases always have to be Singleton
  bind<ILoadUserInitialLearningWorldsInfoUseCase>(
    USECASE_TYPES.ILoadUserInitialLearningWorldsInfoUseCase
  )
    .to(LoadUserInitialLearningWorldsInfoUseCase)
    .inSingletonScope();
  bind<ILoadUserLearningWorldsInfoUseCase>(
    USECASE_TYPES.ILoadUserLearningWorldsInfoUseCase
  )
    .to(LoadUserLearningWorldsInfoUseCase)
    .inSingletonScope();

  bind<ILoadLearningWorldUseCase>(USECASE_TYPES.ILoadLearningWorldUseCase)
    .to(LoadLearningWorldUseCase)
    .inSingletonScope();
  bind<ISetWorldCompletionModalToShownUseCase>(
    USECASE_TYPES.ISetWorldCompletionModalToShownUseCase
  )
    .to(SetWorldCompletionModalToShownUseCase)
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

  bind<IGetAdaptivityElementStatusUseCase>(
    USECASE_TYPES.IGetAdaptivityElementStatusUseCase
  )
    .to(GetAdaptivityElementStatusUseCase)
    .inSingletonScope();

  bind<ISubmitAdaptivityElementSelectionUseCase>(
    USECASE_TYPES.ISubmitAdaptivityElementSelectionUseCase
  )
    .to(SubmitAdaptivityElementSelectionUseCase)
    .inSingletonScope();

  bind<IStartOverallTimeSpentTimerUseCase>(
    USECASE_TYPES.IStartOverallTimeSpentTimerUseCase
  )
    .to(StartOverallTimeSpentTimerUseCase)
    .inSingletonScope();

  bind<ICreateOverallTimeSpentTimerUseCase>(
    USECASE_TYPES.ICreateOverallTimeSpentTimerUseCase
  )
    .to(CreateOverallTimeSpentUseCase)
    .inSingletonScope();

  bind<IPauseOverallTimeSpentTimerUseCase>(
    USECASE_TYPES.IPauseOverallTimeSpentTimerUseCase
  )
    .to(PauseOverallTimeSpentTimerUseCase)
    .inSingletonScope();

  bind<ILoadExternalLearningElementUseCase>(
    USECASE_TYPES.ILoadExternalLearningElementUseCase
  )
    .to(LoadExternalLearningElementUseCase)
    .inSingletonScope();

  bind<IScoreAdaptivityElementUseCase>(
    USECASE_TYPES.IScoreAdaptivityElementUseCase
  )
    .to(ScoreAdaptivityElementUseCase)
    .inSingletonScope();

  bind<IDisplayLearningElementUseCase>(
    USECASE_TYPES.IDisplayLearningElementUseCase
  )
    .to(DisplayLearningElementUseCase)
    .inSingletonScope();

  bind<ILogoutUseCase>(USECASE_TYPES.ILogoutUseCase)
    .to(LogoutUseCase)
    .inSingletonScope();
});

export default UseCaseDIContainer;
