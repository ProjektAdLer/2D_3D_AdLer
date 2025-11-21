import { ContainerModule } from "inversify";
import CalculateLearningSpaceScoreUseCase from "../../Application/UseCases/CalculateLearningSpaceScore/CalculateLearningSpaceScoreUseCase";
import ICalculateLearningSpaceScoreUseCase from "../../Application/UseCases/CalculateLearningSpaceScore/ICalculateLearningSpaceScoreUseCase";
import ILoadLearningElementUseCase from "../../Application/UseCases/LoadLearningElement/ILoadLearningElementUseCase";
import LoadLearningElementUseCase from "../../Application/UseCases/LoadLearningElement/LoadLearningElementUseCase";
import ILoadAvatarConfigUseCase from "../../Application/UseCases/LoadAvatarConfig/ILoadAvatarConfigUseCase";
import LoadAvatarConfigUseCase from "../../Application/UseCases/LoadAvatarConfig/LoadAvatarConfigUseCase";
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
import IGetAdaptivityElementStatusUseCase from "../../Application/UseCases/Adaptivity/GetAdaptivityElementStatusUseCase/IGetAdaptivityElementStatusUseCase";
import GetAdaptivityElementStatusUseCase from "../../Application/UseCases/Adaptivity/GetAdaptivityElementStatusUseCase/GetAdaptivityElementStatusUseCase";
import ILoadExternalLearningElementUseCase from "../../Application/UseCases/Adaptivity/LoadExternalLearningElementUseCase/ILoadExternalLearningElementUseCase";
import LoadExternalLearningElementUseCase from "../../Application/UseCases/Adaptivity/LoadExternalLearningElementUseCase/LoadExternalLearningElementUseCase";
import IScoreAdaptivityElementUseCase from "../../Application/UseCases/Adaptivity/ScoreAdaptivityElementUseCase/IScoreAdaptivityElementUseCase";
import ScoreAdaptivityElementUseCase from "../../Application/UseCases/Adaptivity/ScoreAdaptivityElementUseCase/ScoreAdaptivityElementUseCase";
import IDisplayAdaptivityHintLearningElementUseCase from "../../Application/UseCases/Adaptivity/DisplayAdaptivityHintLearningElement/IDisplayAdaptivityHintLearningElementUseCase";
import DisplayAdaptivityHintLearningElementUseCase from "../../Application/UseCases/Adaptivity/DisplayAdaptivityHintLearningElement/DisplayAdaptivityHintLearningElementUseCase";
import ILogoutUseCase from "../../Application/UseCases/Logout/ILogoutUseCase";
import LogoutUseCase from "../../Application/UseCases/Logout/LogoutUseCase";
import ILoadUserLearningWorldsInfoUseCase from "../../Application/UseCases/LoadUserLearningWorldsInfo/ILoadUserLearningWorldsInfoUseCase";
import LoadUserLearningWorldsInfoUseCase from "../../Application/UseCases/LoadUserLearningWorldsInfo/LoadUserLearningWorldsInfoUseCase";
import ISetWorldCompletionModalToShownUseCase from "../../Application/UseCases/SetWorldCompletionModalToShown/ISetWorldCompletionModalToShownUseCase";
import SetWorldCompletionModalToShownUseCase from "../../Application/UseCases/SetWorldCompletionModalToShown/SetWorldCompletionModalToShownUseCase";
import ILoadStoryElementUseCase from "../../Application/UseCases/LoadStoryElement/ILoadStoryElementUseCase";
import LoadStoryElementUseCase from "../../Application/UseCases/LoadStoryElement/LoadStoryElementUseCase";
import IBeginStoryElementIntroCutSceneUseCase from "../../Application/UseCases/BeginStoryElementIntroCutScene/IBeginStoryElementIntroCutSceneUseCase";
import BeginStoryElementIntroCutSceneUseCase from "../../Application/UseCases/BeginStoryElementIntroCutScene/BeginStoryElementIntroCutSceneUseCase";
import IEndStoryElementCutScene from "../../Application/UseCases/EndStoryElementCutScene/IEndStoryElementCutSceneUseCase";
import EndStoryElementCutSceneUseCase from "../../Application/UseCases/EndStoryElementCutScene/EndStoryElementCutSceneUseCase";
import IBeginStoryElementOutroCutSceneUseCase from "../../Application/UseCases/BeginStoryElementOutroCutScene/IBeginStoryElementOutroCutSceneUseCase";
import BeginStoryElementOutroCutSceneUseCase from "../../Application/UseCases/BeginStoryElementOutroCutScene/BeginStoryElementOutroCutScene";
import IStartOverallTimeSpentTimerUseCase from "../../Application/UseCases/Adaptivity/OverallTimeSpent/StartOverallTimeSpentTimer/IStartOverallTimeSpentTimerUseCase";
import StartOverallTimeSpentTimerUseCase from "../../Application/UseCases/Adaptivity/OverallTimeSpent/StartOverallTimeSpentTimer/StartOverallTimeSpentTimerUseCase";
import ICreateOverallTimeSpentTimerUseCase from "../../Application/UseCases/Adaptivity/OverallTimeSpent/CreateOverallTimeSpentTimer/ICreateOverallTimeSpentTimerUseCase";
import CreateOverallTimeSpentUseCase from "../../Application/UseCases/Adaptivity/OverallTimeSpent/CreateOverallTimeSpentTimer/CreateOverallTimeSpentTimerUseCase";
import IPauseOverallTimeSpentTimerUseCase from "../../Application/UseCases/Adaptivity/OverallTimeSpent/PauseOverallTimeSpentTimer/IPauseOverallTimeSpentTimerUseCase";
import PauseOverallTimeSpentTimerUseCase from "../../Application/UseCases/Adaptivity/OverallTimeSpent/PauseOverallTimeSpentTimer/PauseOverallTimeSpentTimerUseCase";
import IGetUnseenBreakTimeNotificationUseCase from "../../Application/UseCases/Adaptivity/OverallTimeSpent/GetUnseenBreakTimeNotification/IGetUnseenBreakTimeNotificationUseCase";
import GetUnseenBreakTimeNotificationUseCase from "../../Application/UseCases/Adaptivity/OverallTimeSpent/GetUnseenBreakTimeNotification/GetUnseenBreakTimeNotificationUseCase";
import IUpdateAvatarConfigUseCase from "../../Application/UseCases/UpdateAvatarConfig/IUpdateAvatarConfigUseCase";
import UpdateAvatarConfigUseCase from "../../Application/UseCases/UpdateAvatarConfig/UpdateAvatarConfigUseCase";
import ISaveAvatarConfigUseCase from "../../Application/UseCases/SaveAvatarConfig/ISaveAvatarConfigUseCase";
import SaveAvatarConfigUseCase from "../../Application/UseCases/SaveAvatarConfig/SaveAvatarConfigUseCase";
import IGetLearningWorldUseCase from "../../Application/UseCases/GetLearningWorld/IGetLearningWorldUseCase";
import GetLearningWorldUseCase from "../../Application/UseCases/GetLearningWorld/GetLearningWorldUseCase";
import IGetNarrativeFrameworkInfoUseCase from "../../Application/UseCases/GetNarrativeFrameworkInfo/IGetNarrativeFrameworkInfoUseCase";
import GetNarrativeFrameworkInfoUseCase from "../../Application/UseCases/GetNarrativeFrameworkInfo/GetNarrativeFrameworkInfoUseCase";
import ICalculateInitialExperiencePointsUseCase from "../../Application/UseCases/CalculateInitialExperiencePoints/ICalculateInitialExperiencePointsUseCase";
import CalculateInitialExperiencePointsUseCase from "../../Application/UseCases/CalculateInitialExperiencePoints/CalculateInitialExperiencePointsUseCase";
import IUpdateExperiencePointsUseCase from "../../Application/UseCases/UpdateExperiencePoints/IUpdateExperiencePointsUseCase";
import UpdateExperiencePointsUseCase from "../../Application/UseCases/UpdateExperiencePoints/UpdateExperiencePointsUseCase";
import IGetExperiencePointsUseCase from "../../Application/UseCases/GetExperiencePoints/IGetExperiencePoints";
import GetExperiencePointsUseCase from "../../Application/UseCases/GetExperiencePoints/GetExperiencePoints";
import IRandomizeAvatarConfigUseCase from "../../Application/UseCases/RandomizeAvatarConfig/IRandomizeAvatarConfigUseCase"; // Neuer Import
import RandomizeAvatarConfigUseCase from "../../Application/UseCases/RandomizeAvatarConfig/RandomizeAvatarConfigUseCase"; // Neuer Import
import ISetSettingsConfigUseCase from "../../Application/UseCases/SetSettingsConfig/ISetSettingsConfigUseCase";
import SetSettingsConfigUseCase from "../../Application/UseCases/SetSettingsConfig/SetSettingsConfigUseCase";
import IGetSettingsConfigUseCase from "../../Application/UseCases/GetSettingsConfig/IGetSettingsConfigUseCase";
import GetSettingsConfigUseCase from "../../Application/UseCases/GetSettingsConfig/GetSettingsConfigUseCase";
import IImportLearningWorldUseCase from "../../Application/UseCases/ImportLearningWorld/IImportLearningWorldUseCase";
import ImportLearningWorldUseCase from "../../Application/UseCases/ImportLearningWorld/ImportLearningWorldUseCase";
import IDeleteLearningWorldUseCase from "../../Application/UseCases/DeleteLearningWorld/IDeleteLearningWorldUseCase";
import DeleteLearningWorldUseCase from "../../Application/UseCases/DeleteLearningWorld/DeleteLearningWorldUseCase";
import IExportLearningWorldUseCase from "../../Application/UseCases/ExportLearningWorld/IExportLearningWorldUseCase";
import ExportLearningWorldUseCase from "../../Application/UseCases/ExportLearningWorld/ExportLearningWorldUseCase";
import ILoadLocalWorldsListUseCase from "../../Application/UseCases/LoadLocalWorldsList/ILoadLocalWorldsListUseCase";
import LoadLocalWorldsListUseCase from "../../Application/UseCases/LoadLocalWorldsList/LoadLocalWorldsListUseCase";
import IGetWorldsStorageInfoUseCase from "../../Application/UseCases/GetWorldsStorageInfo/IGetWorldsStorageInfoUseCase";
import GetWorldsStorageInfoUseCase from "../../Application/UseCases/GetWorldsStorageInfo/GetWorldsStorageInfoUseCase";

const UseCaseDIContainer = new ContainerModule((bind) => {
  // Use Cases
  // Use Cases always have to be Singleton
  bind<ILoadUserInitialLearningWorldsInfoUseCase>(
    USECASE_TYPES.ILoadUserInitialLearningWorldsInfoUseCase,
  )
    .to(LoadUserInitialLearningWorldsInfoUseCase)
    .inSingletonScope();

  bind<ILoadUserLearningWorldsInfoUseCase>(
    USECASE_TYPES.ILoadUserLearningWorldsInfoUseCase,
  )
    .to(LoadUserLearningWorldsInfoUseCase)
    .inSingletonScope();

  bind<ILoadLearningWorldUseCase>(USECASE_TYPES.ILoadLearningWorldUseCase)
    .to(LoadLearningWorldUseCase)
    .inSingletonScope();

  bind<ISetWorldCompletionModalToShownUseCase>(
    USECASE_TYPES.ISetWorldCompletionModalToShownUseCase,
  )
    .to(SetWorldCompletionModalToShownUseCase)
    .inSingletonScope();

  bind<ILoadAvatarConfigUseCase>(USECASE_TYPES.ILoadAvatarConfigUseCase)
    .to(LoadAvatarConfigUseCase)
    .inSingletonScope();

  bind<IScoreLearningElementUseCase>(USECASE_TYPES.IScoreLearningElementUseCase)
    .to(ScoreLearningElementUseCase)
    .inSingletonScope();

  bind<ILoadLearningElementUseCase>(USECASE_TYPES.ILoadLearningElementUseCase)
    .to(LoadLearningElementUseCase)
    .inSingletonScope();

  bind<ICalculateLearningSpaceScoreUseCase>(
    USECASE_TYPES.ICalculateLearningSpaceScoreUseCase,
  )
    .to(CalculateLearningSpaceScoreUseCase)
    .inSingletonScope();

  bind<ICalculateLearningWorldScoreUseCase>(
    USECASE_TYPES.ICalculateLearningWorldScoreUseCase,
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
    USECASE_TYPES.IGetLearningElementSourceUseCase,
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
    USECASE_TYPES.ICalculateLearningSpaceAvailabilityUseCase,
  )
    .to(CalculateLearningSpaceAvailabilityUseCase)
    .inSingletonScope();

  bind<IGetLearningSpacePrecursorAndSuccessorUseCase>(
    USECASE_TYPES.IGetLearningSpacePrecursorAndSuccessorUseCase,
  )
    .to(GetLearningSpacePrecursorAndSuccessorUseCase)
    .inSingletonScope();

  bind<ILoadAdaptivityElementUseCase>(
    USECASE_TYPES.ILoadAdaptivityElementUseCase,
  )
    .to(LoadAdaptivityElementUseCase)
    .inSingletonScope();

  bind<IGetAdaptivityElementStatusUseCase>(
    USECASE_TYPES.IGetAdaptivityElementStatusUseCase,
  )
    .to(GetAdaptivityElementStatusUseCase)
    .inSingletonScope();

  bind<ISubmitAdaptivityElementSelectionUseCase>(
    USECASE_TYPES.ISubmitAdaptivityElementSelectionUseCase,
  )
    .to(SubmitAdaptivityElementSelectionUseCase)
    .inSingletonScope();

  bind<IStartOverallTimeSpentTimerUseCase>(
    USECASE_TYPES.IStartOverallTimeSpentTimerUseCase,
  )
    .to(StartOverallTimeSpentTimerUseCase)
    .inSingletonScope();

  bind<ICreateOverallTimeSpentTimerUseCase>(
    USECASE_TYPES.ICreateOverallTimeSpentTimerUseCase,
  )
    .to(CreateOverallTimeSpentUseCase)
    .inSingletonScope();

  bind<IPauseOverallTimeSpentTimerUseCase>(
    USECASE_TYPES.IPauseOverallTimeSpentTimerUseCase,
  )
    .to(PauseOverallTimeSpentTimerUseCase)
    .inSingletonScope();

  bind<ILoadExternalLearningElementUseCase>(
    USECASE_TYPES.ILoadExternalLearningElementUseCase,
  )
    .to(LoadExternalLearningElementUseCase)
    .inSingletonScope();

  bind<IScoreAdaptivityElementUseCase>(
    USECASE_TYPES.IScoreAdaptivityElementUseCase,
  )
    .to(ScoreAdaptivityElementUseCase)
    .inSingletonScope();

  bind<IDisplayAdaptivityHintLearningElementUseCase>(
    USECASE_TYPES.IDisplayAdaptivityHintLearningElementUseCase,
  )
    .to(DisplayAdaptivityHintLearningElementUseCase)
    .inSingletonScope();

  bind<ILogoutUseCase>(USECASE_TYPES.ILogoutUseCase)
    .to(LogoutUseCase)
    .inSingletonScope();

  bind<ILoadStoryElementUseCase>(USECASE_TYPES.ILoadStoryElementUseCase)
    .to(LoadStoryElementUseCase)
    .inSingletonScope();

  bind<IBeginStoryElementIntroCutSceneUseCase>(
    USECASE_TYPES.IBeginStoryElementIntroCutSceneUseCase,
  )
    .to(BeginStoryElementIntroCutSceneUseCase)
    .inSingletonScope();
  bind<IBeginStoryElementOutroCutSceneUseCase>(
    USECASE_TYPES.IBeginStoryElementOutroCutSceneUseCase,
  )
    .to(BeginStoryElementOutroCutSceneUseCase)
    .inSingletonScope();

  bind<IEndStoryElementCutScene>(USECASE_TYPES.IEndStoryElementCutSceneUseCase)
    .to(EndStoryElementCutSceneUseCase)
    .inSingletonScope();

  bind<IGetUnseenBreakTimeNotificationUseCase>(
    USECASE_TYPES.IGetUnseenBreakTimeNotificationUseCase,
  )
    .to(GetUnseenBreakTimeNotificationUseCase)
    .inSingletonScope();

  bind<IUpdateAvatarConfigUseCase>(USECASE_TYPES.IUpdateAvatarConfigUseCase)
    .to(UpdateAvatarConfigUseCase)
    .inSingletonScope();

  bind<ISaveAvatarConfigUseCase>(USECASE_TYPES.ISaveAvatarConfigUseCase)
    .to(SaveAvatarConfigUseCase)
    .inSingletonScope();

  bind<IGetLearningWorldUseCase>(USECASE_TYPES.IGetLearningWorldUseCase)
    .to(GetLearningWorldUseCase)
    .inSingletonScope();

  bind<IGetNarrativeFrameworkInfoUseCase>(
    USECASE_TYPES.IGetNarrativeFrameworkInfoUseCase,
  )
    .to(GetNarrativeFrameworkInfoUseCase)
    .inSingletonScope();

  bind<ICalculateInitialExperiencePointsUseCase>(
    USECASE_TYPES.ICalculateInitialExperiencePointsUseCase,
  )
    .to(CalculateInitialExperiencePointsUseCase)
    .inSingletonScope();

  bind<IUpdateExperiencePointsUseCase>(
    USECASE_TYPES.IUpdateExperiencePointsUseCase,
  )
    .to(UpdateExperiencePointsUseCase)
    .inSingletonScope();

  bind<IGetExperiencePointsUseCase>(USECASE_TYPES.IGetExperiencePointsUseCase)
    .to(GetExperiencePointsUseCase)
    .inSingletonScope();

  bind<IRandomizeAvatarConfigUseCase>(
    USECASE_TYPES.IRandomizeAvatarConfigUseCase,
  )
    .to(RandomizeAvatarConfigUseCase)
    .inSingletonScope();

  bind<ISetSettingsConfigUseCase>(USECASE_TYPES.ISetSettingsConfigUseCase)
    .to(SetSettingsConfigUseCase)
    .inSingletonScope();

  bind<IGetSettingsConfigUseCase>(USECASE_TYPES.IGetSettingsConfigUseCase)
    .to(GetSettingsConfigUseCase)
    .inSingletonScope();

  bind<IImportLearningWorldUseCase>(USECASE_TYPES.IImportLearningWorldUseCase)
    .to(ImportLearningWorldUseCase)
    .inSingletonScope();

  bind<IDeleteLearningWorldUseCase>(USECASE_TYPES.IDeleteLearningWorldUseCase)
    .to(DeleteLearningWorldUseCase)
    .inSingletonScope();

  bind<IExportLearningWorldUseCase>(USECASE_TYPES.IExportLearningWorldUseCase)
    .to(ExportLearningWorldUseCase)
    .inSingletonScope();

  bind<ILoadLocalWorldsListUseCase>(USECASE_TYPES.ILoadLocalWorldsListUseCase)
    .to(LoadLocalWorldsListUseCase)
    .inSingletonScope();

  bind<IGetWorldsStorageInfoUseCase>(USECASE_TYPES.IGetWorldsStorageInfoUseCase)
    .to(GetWorldsStorageInfoUseCase)
    .inSingletonScope();
});

export default UseCaseDIContainer;
