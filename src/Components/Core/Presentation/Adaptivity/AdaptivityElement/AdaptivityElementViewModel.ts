import Observable from "src/Lib/Observable";
import { StyledButtonColor } from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";

export class QuizAnswer {
  answerIndex: number;
  answerText: string;
  isSelected: boolean;
}

export class AdaptivityQuestion {
  questionID: number;
  questionText: string;
  questionPoints: number;
  questionAnswers: QuizAnswer[];
}

export class AdaptivityTask {
  taskID: number;
  taskTitle: string;
  questions: AdaptivityQuestion[];
}

export class AdaptivityElementContent {
  elementName: string;
  introText: string;
  tasks: AdaptivityTask[];
}

export default class AdaptivityElementViewModel {
  isOpen: Observable<boolean> = new Observable<boolean>(false);
  contentData: Observable<AdaptivityElementContent> =
    new Observable<AdaptivityElementContent>();

  isFinished: Observable<boolean> = new Observable<boolean>(false);
  currentElement: Observable<AdaptivityQuestion> =
    new Observable<AdaptivityQuestion>();
  evaluation = new Observable<Map<number, StyledButtonColor>>();
}
