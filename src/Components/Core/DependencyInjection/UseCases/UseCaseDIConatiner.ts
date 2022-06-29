import { ContainerModule } from "inversify";
import CalculateTotalRoomScore from "../../Application/CalculateTotalRoomScore/CalculateTotalRoomScore";
import ICalculateTotalRoomScore from "../../Application/CalculateTotalRoomScore/ICalculateTotalRoomScore";
import DebugUseCase from "../../Application/DebugUseCase/DebugUseCase";
import IDebugUseCase from "../../Application/DebugUseCase/IDebugUseCase";
import ILearningElementStartedUseCase from "../../Application/LearningElementStarted/ILearningElementStartedUseCase";
import LearningElementStartedUseCase from "../../Application/LearningElementStarted/LearningElementStartedUseCase";
import ILoadAvatarUseCase from "../../Application/LoadAvatar/ILoadAvatarUseCase";
import LoadAvatarUseCase from "../../Application/LoadAvatar/LoadAvatarUseCase";
import ILoadWorldUseCase from "../../Application/LoadWorld/ILoadWorldUseCase";
import LoadWorldUseCase from "../../Application/LoadWorld/LoadWorldUseCase";
import ILogUserIntoMoodleUseCase from "../../Application/LogUserIntoMoodle/ILogUserIntoMoodleUseCase";
import LogUserIntoMoodleUseCase from "../../Application/LogUserIntoMoodle/LogUserIntoMoodleUseCase";
import IScoreLearningElementUseCase from "../../Application/ScoreLearningElement/IScoreLearningElementUseCase";
import ScoreLearningElementUseCase from "../../Application/ScoreLearningElement/ScoreLearningElementUseCase";
import USECASE_TYPES from "./USECASE_SYMBOLS";

const useCaseDIContainer = new ContainerModule((bind) => {
  // Use Cases
  // Use Cases always have to be Singleton
  bind<ILoadWorldUseCase>(USECASE_TYPES.ILoadWorldUseCase)
    .to(LoadWorldUseCase)
    .inSingletonScope();

  bind<ILoadAvatarUseCase>(USECASE_TYPES.ILoadAvatarUseCase)
    .to(LoadAvatarUseCase)
    .inSingletonScope();

  bind<IScoreLearningElementUseCase>(USECASE_TYPES.IScoreLearningElementUseCase)
    .to(ScoreLearningElementUseCase)
    .inSingletonScope();

  bind<ILearningElementStartedUseCase>(
    USECASE_TYPES.ILearningElementStartedUseCase
  )
    .to(LearningElementStartedUseCase)
    .inSingletonScope();

  bind<ICalculateTotalRoomScore>(USECASE_TYPES.ICalculateTotalRoomScore)
    .to(CalculateTotalRoomScore)
    .inSingletonScope();

  bind<ILogUserIntoMoodleUseCase>(USECASE_TYPES.ILogUserIntoMoodleUseCase)
    .to(LogUserIntoMoodleUseCase)
    .inSingletonScope();

  bind<IDebugUseCase>(USECASE_TYPES.IDebugUseCase)
    .to(DebugUseCase)
    .inSingletonScope();
});

export default useCaseDIContainer;
