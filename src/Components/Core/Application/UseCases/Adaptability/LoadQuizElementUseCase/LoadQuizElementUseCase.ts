import { inject, injectable } from "inversify";
import ILoadQuizElementUseCase from "./ILoadQuizElementUseCase";
import {
  AdaptivityContentsTO,
  AdaptivityQuestionTO,
  AnswerTO,
} from "../../../DataTransferObjects/QuizElementTO";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import type ILearningWorldPort from "../../../Ports/Interfaces/ILearningWorldPort";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import type ILoggerPort from "../../../Ports/Interfaces/ILoggerPort";
import { LogLevelTypes } from "src/Components/Core/Domain/Types/LogLevelTypes";

// temporary hardcoded data
function generateAdaptivityContentsTO(): AdaptivityContentsTO {
  const contents = new AdaptivityContentsTO();
  contents.shuffleQuestions = false;
  contents.questions = new Array();

  for (let k = 1; k < 4; k++) {
    const question = new AdaptivityQuestionTO();
    question.questionAnswers = new Array();
    question.questionPoints = 1;

    if (k === 1) {
      question.questionID = k;
      question.questionText =
        "Wie viele Einwohner hatte Kempten im Jahr 2022? Also wie viele genau, quasi so ungefähr, wenn man die einen weglässt und die anderen dazu nimmt und die wieder anderen außen vor lässt, weil die eben, ja. Wie viele?";

      for (let i = 1; i < 13; i++) {
        const answer = new AnswerTO();
        answer.answerIndex = i;
        answer.answerText = (i * 10000).toString();
        question.questionAnswers.push(answer);
      }
    }

    if (k === 2) {
      question.questionID = k;
      question.questionText = "Welche Himmelsrichtungen existieren wirklich?";
      let answer = new AnswerTO();
      answer.answerIndex = 1;
      answer.answerText = "Norden";
      question.questionAnswers.push(answer);
      answer = new AnswerTO();
      answer.answerIndex = 2;
      answer.answerText = "Rüben";
      question.questionAnswers.push(answer);
      answer = new AnswerTO();
      answer.answerIndex = 3;
      answer.answerText = "Süden";
      question.questionAnswers.push(answer);
      answer = new AnswerTO();
      answer.answerIndex = 4;
      answer.answerText = "Ozten";
      question.questionAnswers.push(answer);
    }

    if (k === 3) {
      question.questionID = k;
      question.questionText = "Welche Automarken gehören zur BMW-group?";
      let answer = new AnswerTO();
      answer.answerIndex = 1;
      answer.answerText = "BMW";
      question.questionAnswers.push(answer);
      answer = new AnswerTO();
      answer.answerIndex = 2;
      answer.answerText = "Mini";
      question.questionAnswers.push(answer);
      answer = new AnswerTO();
      answer.answerIndex = 3;
      answer.answerText = "Rolls-Royce";
      question.questionAnswers.push(answer);
      answer = new AnswerTO();
      answer.answerIndex = 4;
      answer.answerText = "VW";
      question.questionAnswers.push(answer);
    }

    contents.questions.push(question);
  }

  return contents;
}

@injectable()
export default class LoadQuizElementUseCase implements ILoadQuizElementUseCase {
  constructor(
    @inject(CORE_TYPES.ILogger)
    private logger: ILoggerPort,
    @inject(PORT_TYPES.ILearningWorldPort)
    private worldPort: ILearningWorldPort
  ) {}

  async executeAsync(filepath: string): Promise<void> {
    this.logger.log(
      LogLevelTypes.TRACE,
      `LoadQuizElementUseCase: Loaded QuizElement from ${filepath}.`
    );

    const content = generateAdaptivityContentsTO();
    this.worldPort.onAdaptivityElementLoaded(content);
    return Promise.resolve();
  }
}
