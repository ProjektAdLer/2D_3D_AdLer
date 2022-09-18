import { ContainerModule } from "inversify";
import CalculateSpaceScore from "../../Application/CalculateSpaceScore/CalculateSpaceScore";
import ICalculateSpaceScore from "../../Application/CalculateSpaceScore/ICalculateSpaceScore";
import DebugUseCase from "../../Application/DebugUseCase/DebugUseCase";
import IDebugUseCase from "../../Application/DebugUseCase/IDebugUseCase";
import IElementStartedUseCase from "../../Application/ElementStarted/IElementStartedUseCase";
import ElementStartedUseCase from "../../Application/ElementStarted/ElementStartedUseCase";
import ILoadAvatarUseCase from "../../Application/LoadAvatar/ILoadAvatarUseCase";
import LoadAvatarUseCase from "../../Application/LoadAvatar/LoadAvatarUseCase";
import ILoadSpaceUseCase from "../../Application/LoadSpace/ILoadSpaceUseCase";
import LoadSpaceUseCase from "../../Application/LoadSpace/LoadSpaceUseCase";
import ILoadWorldUseCase from "../../Application/LoadWorld/ILoadWorldUseCase";
import LoadWorldUseCase from "../../Application/LoadWorld/LoadWorldUseCase";
import ILogUserIntoMoodleUseCase from "../../Application/LogUserIntoMoodle/ILogUserIntoMoodleUseCase";
import LogUserIntoMoodleUseCase from "../../Application/LogUserIntoMoodle/LogUserIntoMoodleUseCase";
import IScoreElementUseCase from "../../Application/ScoreElement/IScoreElementUseCase";
import ScoreElementUseCase from "../../Application/ScoreElement/ScoreElementUseCase";
import USECASE_TYPES from "./USECASE_TYPES";

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

  bind<ICalculateSpaceScore>(USECASE_TYPES.ICalculateSpaceScore)
    .to(CalculateSpaceScore)
    .inSingletonScope();

  bind<ILogUserIntoMoodleUseCase>(USECASE_TYPES.ILogUserIntoMoodleUseCase)
    .to(LogUserIntoMoodleUseCase)
    .inSingletonScope();

  bind<IDebugUseCase>(USECASE_TYPES.IDebugUseCase)
    .to(DebugUseCase)
    .inSingletonScope();

  bind<ILoadSpaceUseCase>(USECASE_TYPES.ILoadSpaceUseCase)
    .to(LoadSpaceUseCase)
    .inSingletonScope();
});

export default UseCaseDIContainer;
