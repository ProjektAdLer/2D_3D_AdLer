import { ContainerModule } from "inversify";
import CalculateSpaceScoreUseCase from "../../Application/UseCases/CalculateSpaceScore/CalculateSpaceScoreUseCase";
import ICalculateSpaceScoreUseCase from "../../Application/UseCases/CalculateSpaceScore/ICalculateSpaceScoreUseCase";
import ILoadElementUseCase from "../../Application/UseCases/ElementStarted/ILoadElementUseCase";
import LoadElementUseCase from "../../Application/UseCases/ElementStarted/LoadElementUseCase";
import ILoadAvatarUseCase from "../../Application/UseCases/LoadAvatar/ILoadAvatarUseCase";
import LoadAvatarUseCase from "../../Application/UseCases/LoadAvatar/LoadAvatarUseCase";
import ILoadSpaceUseCase from "../../Application/UseCases/LoadSpace/ILoadSpaceUseCase";
import LoadSpaceUseCase from "../../Application/UseCases/LoadSpace/LoadSpaceUseCase";
import ILoadWorldUseCase from "../../Application/UseCases/LoadWorld/ILoadWorldUseCase";
import LoadWorldUseCase from "../../Application/UseCases/LoadWorld/LoadWorldUseCase";
import ILoginUseCase from "../../Application/UseCases/Login/ILoginUseCase";
import LoginUseCase from "../../Application/UseCases/Login/LoginUseCase";
import IScoreElementUseCase from "../../Application/UseCases/ScoreElement/IScoreElementUseCase";
import ScoreElementUseCase from "../../Application/UseCases/ScoreElement/ScoreElementUseCase";
import USECASE_TYPES from "./USECASE_TYPES";
import IScoreH5PElementUseCase from "../../Application/UseCases/ScoreH5PElement/IScoreH5PElementUseCase";
import ScoreH5PElementUseCase from "../../Application/UseCases/ScoreH5PElement/ScoreH5PElementUseCase";
import IGetElementSourceUseCase from "../../Application/UseCases/GetElementSource/IGetElementSourceUseCase";
import GetElementSourceUseCase from "../../Application/UseCases/GetElementSource/GetElementSourceUseCase";
import ILoadUserWorldsUseCase from "../../Application/UseCases/LoadUserWorlds/ILoadUserWorldsUseCase";
import LoadUserWorldsUseCase from "../../Application/UseCases/LoadUserWorlds/LoadUserWorldsUseCase";
import IGetLoginStatusUseCase from "../../Application/UseCases/GetLoginStatus/IGetLoginStatusUseCase";
import GetLoginStatusUseCase from "../../Application/UseCases/GetLoginStatus/GetLoginStatusUseCase";
import SetCurrentUserLocationUseCase from "../../Application/UseCases/SetCurrentUserLocation/SetCurrentUserLocationUseCase";
import ISetCurrentUserLocationUseCase from "../../Application/UseCases/SetCurrentUserLocation/ISetCurrentUserLocationUseCase";
import IGetCurrentUserLocationUseCase from "../../Application/UseCases/GetCurrentUserLocation/IGetCurrentUserLocationUseCase";
import GetCurrentUserLocationUseCase from "../../Application/UseCases/GetCurrentUserLocation/GetCurrentUserLocationUseCase";
import CalculateWorldScoreUseCase from "../../Application/UseCases/CalculateWorldScore/CalculateWorldScoreUseCase";
import ICalculateWorldScoreUseCase from "../../Application/UseCases/CalculateWorldScore/ICalculateWorldScoreUseCase";

const UseCaseDIContainer = new ContainerModule((bind) => {
  // Use Cases
  // Use Cases always have to be Singleton
  bind<ILoadUserWorldsUseCase>(USECASE_TYPES.ILoadUserWorldsUseCase)
    .to(LoadUserWorldsUseCase)
    .inSingletonScope();

  bind<ILoadWorldUseCase>(USECASE_TYPES.ILoadWorldUseCase)
    .to(LoadWorldUseCase)
    .inSingletonScope();

  bind<ILoadAvatarUseCase>(USECASE_TYPES.ILoadAvatarUseCase)
    .to(LoadAvatarUseCase)
    .inSingletonScope();

  bind<IScoreElementUseCase>(USECASE_TYPES.IScoreElementUseCase)
    .to(ScoreElementUseCase)
    .inSingletonScope();

  bind<ILoadElementUseCase>(USECASE_TYPES.ILoadElementUseCase)
    .to(LoadElementUseCase)
    .inSingletonScope();

  bind<ICalculateSpaceScoreUseCase>(USECASE_TYPES.ICalculateSpaceScoreUseCase)
    .to(CalculateSpaceScoreUseCase)
    .inSingletonScope();

  bind<ICalculateWorldScoreUseCase>(USECASE_TYPES.ICalculateWorldScoreUseCase)
    .to(CalculateWorldScoreUseCase)
    .inSingletonScope();

  bind<ILoginUseCase>(USECASE_TYPES.ILoginUseCase)
    .to(LoginUseCase)
    .inSingletonScope();

  bind<ILoadSpaceUseCase>(USECASE_TYPES.ILoadSpaceUseCase)
    .to(LoadSpaceUseCase)
    .inSingletonScope();

  bind<IScoreH5PElementUseCase>(USECASE_TYPES.IScoreH5PElementUseCase)
    .to(ScoreH5PElementUseCase)
    .inSingletonScope();

  bind<IGetElementSourceUseCase>(USECASE_TYPES.IGetElementSourceUseCase)
    .to(GetElementSourceUseCase)
    .inSingletonScope();

  bind<IGetLoginStatusUseCase>(USECASE_TYPES.IGetLoginStatusUseCase)
    .to(GetLoginStatusUseCase)
    .inSingletonScope();

  bind<ISetCurrentUserLocationUseCase>(
    USECASE_TYPES.ISetCurrentUserLocationUseCase
  )
    .to(SetCurrentUserLocationUseCase)
    .inSingletonScope();

  bind<IGetCurrentUserLocationUseCase>(
    USECASE_TYPES.IGetCurrentUserLocationUseCase
  )
    .to(GetCurrentUserLocationUseCase)
    .inSingletonScope();
});

export default UseCaseDIContainer;
