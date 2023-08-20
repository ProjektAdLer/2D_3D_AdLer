import { inject, injectable } from "inversify";
import ILoadQuizElementUseCase from "./ILoadQuizElementUseCase";
import QuizElementTO from "../../../DataTransferObjects/QuizElementTO";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import type ILearningWorldPort from "../../../Ports/Interfaces/ILearningWorldPort";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import type ILoggerPort from "../../../Ports/Interfaces/ILoggerPort";
import { LogLevelTypes } from "src/Components/Core/Domain/Types/LogLevelTypes";

@injectable()
export default class LoadQuizElementUseCase implements ILoadQuizElementUseCase {
  constructor(
    @inject(CORE_TYPES.ILogger)
    private logger: ILoggerPort,
    @inject(PORT_TYPES.ILearningWorldPort)
    private worldPort: ILearningWorldPort
  ) {}

  async executeAsync(filepath: string): Promise<void> {
    const quizElement = new QuizElementTO();
    fetch(filepath)
      .then((response) => response.json())
      .then(
        (js) => (
          Object.assign(quizElement, js),
          this.worldPort.onAdaptabilityElementLoaded(quizElement)
        )
      );
    this.logger.log(
      LogLevelTypes.TRACE,
      `LoadQuizElementUseCase: Loaded QuizElement from ${filepath}.`
    );

    return Promise.resolve();
  }
}
