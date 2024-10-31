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
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import type IGetUserLocationUseCase from "../../GetUserLocation/IGetUserLocationUseCase";
import type IScoreAdaptivityElementUseCase from "../ScoreAdaptivityElementUseCase/IScoreAdaptivityElementUseCase";
import AdaptivityElementQuestionPresentationUpdateTO from "../../../DataTransferObjects/AdaptivityElement/AdaptivityElementQuestionPresentationUpdateTO";
import type INotificationPort from "../../../Ports/Interfaces/INotificationPort";
import { NotificationMessages } from "src/Components/Core/Domain/Types/NotificationMessages";

@injectable()
export default class SubmitAdaptivityElementSelectionUseCase
  implements ISubmitAdaptivityElementSelectionUseCase
{
  constructor(
    @inject(CORE_TYPES.ILogger)
    private logger: ILoggerPort,
    @inject(PORT_TYPES.ILearningWorldPort)
    private worldPort: ILearningWorldPort,
    @inject(CORE_TYPES.IBackendAdapter)
    private backendAdapter: IBackendPort,
    @inject(CORE_TYPES.IEntityContainer)
    private entityContainer: IEntityContainer,
    @inject(USECASE_TYPES.IGetUserLocationUseCase)
    private userLocationUseCase: IGetUserLocationUseCase,
    @inject(USECASE_TYPES.IScoreAdaptivityElementUseCase)
    private scoreAdaptivityElementUseCase: IScoreAdaptivityElementUseCase,
    @inject(PORT_TYPES.INotificationPort)
    private notificationPort: INotificationPort,
  ) {}

  async executeAsync(
    submission: AdaptivityElementQuestionSubmissionTO,
  ): Promise<void> {
    const token =
      this.entityContainer.getEntitiesOfType<UserDataEntity>(UserDataEntity)[0]
        .userToken;

    const userLocation = this.userLocationUseCase.execute();
    if (!userLocation.worldID || !userLocation.spaceID) {
      this.notificationPort.onNotificationTriggered(
        LogLevelTypes.WARN,
        `SubmitAdaptivityElementSelectionUseCase: User is not in a space!`,
        NotificationMessages.USER_NOT_IN_SPACE,
      );
      return Promise.resolve();
    }

    let backendResult;
    try {
      backendResult =
        await this.backendAdapter.getAdaptivityElementQuestionResponse(
          token,
          userLocation.worldID,
          submission,
        );
    } catch (error) {
      this.notificationPort.onNotificationTriggered(
        LogLevelTypes.WARN,
        `SubmitAdaptivityElementSelectionUseCase: Error while submitting adaptivity element selection!`,
        NotificationMessages.BACKEND_ERROR,
      );
      return Promise.resolve();
    }
    // score the element
    if (backendResult.elementScore.success === true) {
      this.scoreAdaptivityElementUseCase.internalExecute(
        backendResult.elementScore.elementId,
      );
    }

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

    if (
      progressUpdateTO.questionInfo.questionStatus ===
      AdaptivityElementStatusTypes.Correct
    ) {
      let questionPresentationUpdateTO: AdaptivityElementQuestionPresentationUpdateTO =
        {
          taskInfo: { taskId: backendResult.gradedTask.taskId },
          questionInfo: {
            questionId: backendResult.gradedQuestion.id,
            answers: backendResult.gradedQuestion.answers!,
          },
        };
      this.worldPort.onAdaptivityElementQuestionAnsweredCorrectly(
        questionPresentationUpdateTO,
      );
    }

    this.worldPort.onAdaptivityElementAnswerEvaluated(progressUpdateTO);

    this.logger.log(
      LogLevelTypes.TRACE,
      `SubmitAdaptivityElementSelectionUseCase: User submitted in adaptivityelement: Element: ${progressUpdateTO.elementInfo.elementId}, Question: ${progressUpdateTO.questionInfo.questionId}`,
    );

    return Promise.resolve();
  }
}
