import {
  EvaluationAnswerTO,
  CorrectAnswersTO,
  SubmittedAnswersTO,
} from "../../../DataTransferObjects/QuizElementTO";
import { inject, injectable } from "inversify";
import ISubmitAdaptivityElementSelectionUseCase from "./ISubmitAdaptivityElementSelectionUseCase";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import type ILoggerPort from "../../../Ports/Interfaces/ILoggerPort";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import type ILearningWorldPort from "../../../Ports/Interfaces/ILearningWorldPort";

// simulate backend call
function retrieveCorrectAnswers(questionID: number): CorrectAnswersTO {
  let correctAnswers = new CorrectAnswersTO();
  correctAnswers.questionID = questionID;
  correctAnswers.answerIndexes = [];

  if (questionID === 1) {
    correctAnswers.answerIndexes.push(8);
  } else if (questionID === 2) {
    correctAnswers.answerIndexes.push(1);
    correctAnswers.answerIndexes.push(3);
  } else if (questionID === 3) {
    correctAnswers.answerIndexes.push(1);
    correctAnswers.answerIndexes.push(2);
    correctAnswers.answerIndexes.push(3);
  }
  return correctAnswers;
}

function isInContainer(target: number, container: number[]): boolean | null {
  if (container.length === 0) return null;

  for (let element of container) {
    if (element === target) return true;
  }
  return false;
}

function determineButtonColor(
  all: number[],
  selected: number[],
  correct: CorrectAnswersTO
): EvaluationAnswerTO {
  let evalutation = new EvaluationAnswerTO();
  evalutation.evaluation = new Map();

  selected.forEach((selectedIndex) => {
    if (isInContainer(selectedIndex, correct.answerIndexes)) {
      // correct and selected
      evalutation.evaluation.set(selectedIndex, "success");
    } else {
      // wrong and selected
      evalutation.evaluation.set(selectedIndex, "locked");
    }
  });

  correct.answerIndexes.forEach((index) => {
    if (!evalutation.evaluation.has(index)) {
      // correct and not selected
      evalutation.evaluation.set(index, "pressed");
    }
  });

  return evalutation;
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

  async executeAsync(selectedAnswers: SubmittedAnswersTO): Promise<void> {
    const correctAnswers = retrieveCorrectAnswers(selectedAnswers.questionID);
    let evaluationTO = determineButtonColor(
      selectedAnswers.allAnswerIndexes,
      selectedAnswers.selectedAnswerIndexes,
      correctAnswers
    );
    evaluationTO.questionID = selectedAnswers.questionID;
    this.worlPort.onAdaptivityElementSubmitted(evaluationTO);
    return Promise.resolve();
  }
}
