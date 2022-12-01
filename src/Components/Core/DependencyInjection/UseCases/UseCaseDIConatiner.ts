import { ContainerModule } from "inversify";
import CalculateSpaceScoreUseCase from "../../Application/UseCases/CalculateSpaceScore/CalculateSpaceScoreUseCase";
import ICalculateSpaceScoreUseCase from "../../Application/UseCases/CalculateSpaceScore/ICalculateSpaceScoreUseCase";
import DebugUseCase from "../../Application/UseCases/Debug/DebugUseCase";
import IDebugUseCase from "../../Application/UseCases/Debug/IDebugUseCase";
import IElementStartedUseCase from "../../Application/UseCases/ElementStarted/IElementStartedUseCase";
import ElementStartedUseCase from "../../Application/UseCases/ElementStarted/ElementStartedUseCase";
import ILoadAvatarUseCase from "../../Application/UseCases/LoadAvatar/ILoadAvatarUseCase";
import LoadAvatarUseCase from "../../Application/UseCases/LoadAvatar/LoadAvatarUseCase";
import ILoadSpaceUseCase from "../../Application/UseCases/LoadSpace/ILoadSpaceUseCase";
import LoadSpaceUseCase from "../../Application/UseCases/LoadSpace/LoadSpaceUseCase";
import ILoadWorldUseCase from "../../Application/UseCases/LoadWorld/ILoadWorldUseCase";
import LoadWorldUseCase from "../../Application/UseCases/LoadWorld/LoadWorldUseCase";
import ILoginMoodleUseCase from "../../Application/UseCases/LoginMoodle/ILoginMoodleUseCase";
import LoginMoodleUseCase from "../../Application/UseCases/LoginMoodle/LoginMoodleUseCase";
import IScoreElementUseCase from "../../Application/UseCases/ScoreElement/IScoreElementUseCase";
import ScoreElementUseCase from "../../Application/UseCases/ScoreElement/ScoreElementUseCase";
import USECASE_TYPES from "./USECASE_TYPES";
import IScoreH5PElement from "../../Application/UseCases/ScoreH5PElement/IScoreH5PElement";
import ScoreH5PElement from "../../Application/UseCases/ScoreH5PElement/ScoreH5PElement";
import IGetElementSourceUseCase from "../../Application/UseCases/GetElementSourceUseCase/IGetElementSourceUseCase";
import GetElementSourceUseCase from "../../Application/UseCases/GetElementSourceUseCase/GetElementSourceUseCase";

const UseCaseDIContainer = new ContainerModule((bind) => {
  // Use Cases
  // Use Cases always have to be Singleton
  bind<ILoadWorldUseCase>(USECASE_TYPES.ILoadWorldUseCase)
    .to(LoadWorldUseCase)
    .inSingletonScope();

  bind<ILoadAvatarUseCase>(USECASE_TYPES.ILoadAvatarUseCase)
    .to(LoadAvatarUseCase)
    .inSingletonScope();

  bind<IScoreElementUseCase>(USECASE_TYPES.IScoreElementUseCase)
    .to(ScoreElementUseCase)
    .inSingletonScope();

  bind<IElementStartedUseCase>(USECASE_TYPES.IElementStartedUseCase)
    .to(ElementStartedUseCase)
    .inSingletonScope();

  bind<ICalculateSpaceScoreUseCase>(USECASE_TYPES.ICalculateSpaceScore)
    .to(CalculateSpaceScoreUseCase)
    .inSingletonScope();

  bind<ILoginMoodleUseCase>(USECASE_TYPES.ILoginMoodleUseCase)
    .to(LoginMoodleUseCase)
    .inSingletonScope();

  bind<IDebugUseCase>(USECASE_TYPES.IDebugUseCase)
    .to(DebugUseCase)
    .inSingletonScope();

  bind<ILoadSpaceUseCase>(USECASE_TYPES.ILoadSpaceUseCase)
    .to(LoadSpaceUseCase)
    .inSingletonScope();

  bind<IScoreH5PElement>(USECASE_TYPES.IScoreH5PElement)
    .to(ScoreH5PElement)
    .inSingletonScope();

  bind<IGetElementSourceUseCase>(USECASE_TYPES.IGetElementSource)
    .to(GetElementSourceUseCase)
    .inSingletonScope();
});

export default UseCaseDIContainer;
