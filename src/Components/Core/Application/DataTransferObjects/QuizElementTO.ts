import { StyledButtonColor } from "./../../Presentation/React/ReactRelated/ReactBaseComponents/StyledButton";
import { ComponentID } from "../../Domain/Types/EntityTypes";

export class SubmittedAnswersTO {
  questionID: number;
  selectedAnswerIndexes: number[];
  allAnswerIndexes: number[];
}

export class CorrectAnswersTO {
  questionID: number;
  answerIndexes: number[];
}

export class EvaluationAnswerTO {
  questionID: number;
  evaluation: Map<number, StyledButtonColor>;
}

export class AnswerTO {
  answerIndex: number;
  questionTitle?: string;
  answerText: string;
  answerImage?: string;
}

export class Question {
  questionID: string;
  questionTitle?: string;
  questionText: string;
  questionImage?: string;
  questionPoints: number;
  questionAnswers: AnswerTO[];
}

export class AdaptivityReference {
  comment: string;
  reference: ComponentID;
}

export class AdaptivityResponse {
  result: string | Question | AdaptivityReference;
}

export class AdaptivityData {
  adaptivityType: string;
  resultType: string;
  condition: string;
  result: AdaptivityResponse;
}

export class TOAdaptivityQuestionTO {
  questionID: number;
  questionTitle?: string;
  questionText: string;
  questionImage?: string;
  questionPoints: number;
  questionAnswers: AnswerTO[];
}

export class AdaptivityContentsTO {
  shuffleQuestions: boolean;
  questions: TOAdaptivityQuestionTO[];
}
