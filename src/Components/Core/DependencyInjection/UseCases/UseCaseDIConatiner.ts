import { ContainerModule } from "inversify";
import CalculateTotalRoomScore from "../../Application/CalculateTotalRoomScore/CalculateTotalRoomScore";
import ICalculateTotalRoomScore from "../../Application/CalculateTotalRoomScore/ICalculateTotalRoomScore";
import ILearningElementStartedUseCase from "../../Application/LearningElementStarted/ILearningElementStartedUseCase";
import LearningElementStartedUseCase from "../../Application/LearningElementStarted/LearningElementStartedUseCase";
import ILoadCharacterUseCase from "../../Application/LoadCharacter/ILoadCharacterUseCase";
import LoadCharacterUseCase from "../../Application/LoadCharacter/LoadCharacterUseCase";
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

  bind<ILoadCharacterUseCase>(USECASE_TYPES.ILoadCharacterUseCase)
    .to(LoadCharacterUseCase)
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
});

export default useCaseDIContainer;
