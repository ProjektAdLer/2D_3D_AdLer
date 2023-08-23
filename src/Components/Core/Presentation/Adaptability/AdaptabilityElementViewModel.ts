import Observable from "src/Lib/Observable";
import { StyledButtonColor } from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";

export class QuizAnswer {
  answerIndex: number;
  answerText: string;
  answerImage?: string;
  isSelected: boolean;
}

export class AdaptivityQuestion {
  questionID: number;
  questionText: string;
  questionImage?: string;
  questionPoints: number;
  //adaptivityData: AdaptivityData[];
  questionAnswers: QuizAnswer[];
}

export class AdaptivityContent {
  questions: AdaptivityQuestion[];
}

export default class AdaptabilityElementViewModel {
  isFinished: Observable<boolean> = new Observable<boolean>(false);
  filePath = new Observable<string>();
  currentElement: Observable<AdaptivityQuestion> =
    new Observable<AdaptivityQuestion>();
  contentData: Observable<AdaptivityContent> =
    new Observable<AdaptivityContent>();
  evaluation = new Observable<Map<number, StyledButtonColor>>();
}
