import { AdaptivityElementStatusTypes } from "./../../../../Domain/Types/Adaptivity/AdaptivityElementStatusTypes";
import { inject, injectable } from "inversify";
import ISubmitAdaptivityElementSelectionUseCase from "./ISubmitAdaptivityElementSelectionUseCase";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import type ILoggerPort from "../../../Ports/Interfaces/ILoggerPort";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import type ILearningWorldPort from "../../../Ports/Interfaces/ILearningWorldPort";
import AdaptivityElementQuestionSubmissionTO from "../../../DataTransferObjects/AdaptivityElement/AdaptivityElementQuestionSubmissionTO";
import AdaptivityElementProgressUpdateTO from "../../../DataTransferObjects/AdaptivityElement/AdaptivityElementProgressUpdateTO";
import type IBackendPort from "../../../Ports/Interfaces/IBackendPort";
import type IEntityContainer from "src/Components/Core/Domain/EntityContainer/IEntityContainer";
import UserDataEntity from "src/Components/Core/Domain/Entities/UserDataEntity";
import { LogLevelTypes } from "src/Components/Core/Domain/Types/LogLevelTypes";

@injectable()
export default class SubmitAdaptivityElementSelectionUseCase
  implements ISubmitAdaptivityElementSelectionUseCase
{
  constructor(
    @inject(CORE_TYPES.ILogger)
    private logger: ILoggerPort,
    @inject(PORT_TYPES.ILearningWorldPort)
    private worlPort: ILearningWorldPort,
    @inject(CORE_TYPES.IBackendAdapter)
    private backendAdapter: IBackendPort,
    @inject(CORE_TYPES.IEntityContainer)
    private entityContainer: IEntityContainer
  ) {}

  async executeAsync(
    submission: AdaptivityElementQuestionSubmissionTO
  ): Promise<void> {
    const token =
      this.entityContainer.getEntitiesOfType<UserDataEntity>(UserDataEntity)[0]
        .userToken;

    const backendResult =
      await this.backendAdapter.getAdaptivityElementQuestionResponse(
        token,
        submission
      );

    let progressUpdateTO: AdaptivityElementProgressUpdateTO = {
      elementInfo: backendResult.elementScore,
      taskInfo: {
        taskId: backendResult.gradedTask.taskId,
        taskStatus:
          AdaptivityElementStatusTypes[
            backendResult.gradedTask
              .taskStatus as keyof typeof AdaptivityElementStatusTypes
          ],
      },
      questionInfo: {
        questionId: backendResult.gradedQuestion.id,
        questionStatus:
          AdaptivityElementStatusTypes[
            backendResult.gradedQuestion
              .status as keyof typeof AdaptivityElementStatusTypes
          ],
      },
    };

    this.worlPort.onAdaptivityElementAnswerEvaluated(progressUpdateTO);

    this.logger.log(
      LogLevelTypes.TRACE,
      `SubmitAdaptivityElementSelectionUseCase: User submitted in adaptivityelement: Element: ${progressUpdateTO.elementInfo.elementId}, Question: ${progressUpdateTO.questionInfo.questionId}`
    );

    return Promise.resolve();
  }
}
