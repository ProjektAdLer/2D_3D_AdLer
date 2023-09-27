import { inject, injectable } from "inversify";
import ISubmitAdaptivityElementSelectionUseCase from "./ISubmitAdaptivityElementSelectionUseCase";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import type ILoggerPort from "../../../Ports/Interfaces/ILoggerPort";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import type ILearningWorldPort from "../../../Ports/Interfaces/ILearningWorldPort";
import AdaptivityElementQuestionSubmissionTO from "../../../DataTransferObjects/AdaptivityElement/AdaptivityElementQuestionSubmissionTO";
import AdaptivityElementProgressUpdateTO from "../../../DataTransferObjects/AdaptivityElement/AdaptivityElementProgressUpdateTO";

class AdaptivityElementBackendQuestionResponse {
  elementScore: {
    elementId: number;
    success: boolean;
  };
  gradedTask: {
    taskId: number;
    taskStatus: string;
  };
  gradedQuestion: {
    id: number;
    status: string;
    answer:
      | [
          {
            checked: boolean;
            correct: boolean;
          }
        ]
      | undefined;
  };
}

// simulate backend call
function simulateBackendCall(
  submission: AdaptivityElementQuestionSubmissionTO
): AdaptivityElementBackendQuestionResponse {
  const backendResponse = new AdaptivityElementBackendQuestionResponse();
  backendResponse.elementScore.elementId = submission.elementID;
  backendResponse.gradedQuestion.id = submission.questionID;
  backendResponse.gradedTask.taskId = submission.taskID;

  switch (submission.questionID) {
    case 0:
      if (
        submission.selectedAnswerIDs.length === 1 &&
        submission.selectedAnswerIDs[0] === 1
      ) {
        backendResponse.elementScore.success = true;
        backendResponse.gradedTask.taskStatus = "Correct";
        backendResponse.gradedQuestion.status = "Correct";
      } else {
        backendResponse.elementScore.success = false;
        backendResponse.gradedQuestion.status = "Incorrect";
        backendResponse.gradedTask.taskStatus = "Incorrect";
      }
      break;
    case 1:
      if (
        submission.selectedAnswerIDs.length === 2 &&
        submission.selectedAnswerIDs.find((e) => e === 0) &&
        submission.selectedAnswerIDs.find((e) => e === 1)
      ) {
        backendResponse.elementScore.success = true;
        backendResponse.gradedTask.taskStatus = "Correct";
        backendResponse.gradedQuestion.status = "Correct";
      } else {
        backendResponse.elementScore.success = false;
        backendResponse.gradedQuestion.status = "Incorrect";
        backendResponse.gradedTask.taskStatus = "Incorrect";
      }
      break;
    default:
      break;
  }

  return backendResponse;
}

@injectable()
export default class SubmitAdaptivityElementSelectionUseCase
  implements ISubmitAdaptivityElementSelectionUseCase
{
  constructor(
    @inject(CORE_TYPES.ILogger)
    private logger: ILoggerPort,
    @inject(PORT_TYPES.ILearningWorldPort)
    private worlPort: ILearningWorldPort
  ) {}

  async executeAsync(
    submission: AdaptivityElementQuestionSubmissionTO
  ): Promise<void> {
    const backendResult = simulateBackendCall(submission);
    let progressUpdateTO: AdaptivityElementProgressUpdateTO = {
      elementInfo: backendResult.elementScore,
      taskInfo: backendResult.gradedTask,
      questionInfo: {
        id: backendResult.gradedQuestion.id,
        status: backendResult.gradedQuestion.status,
      },
    };

    //this.worlPort.onAdaptivityElementSubmitted(evaluationTO);
    return Promise.resolve();
  }
}
