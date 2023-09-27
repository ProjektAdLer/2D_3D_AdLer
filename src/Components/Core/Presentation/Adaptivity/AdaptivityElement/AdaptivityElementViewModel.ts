import Observable from "src/Lib/Observable";
import { StyledButtonColor } from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";

export interface AdaptivityAnswer {
  answerIndex: number;
  answerText: string;
  isSelected: boolean;
}

export interface AdaptivityQuestion {
  questionID: number;
  questionText: string;
  questionAnswers: AdaptivityAnswer[];
  isRequired: boolean;
  isCompleted: boolean;
  difficulty: number;
}

export interface AdaptivityTask {
  taskID: number;
  taskTitle: string;
  questions: AdaptivityQuestion[];
  isCompleted: boolean;
  requiredDifficulty: number;
}

export interface AdaptivityElementContent {
  elementName: string;
  introText: string;
  tasks: AdaptivityTask[];
}

export default class AdaptivityElementViewModel {
  isOpen: Observable<boolean> = new Observable<boolean>(false);
  contentData: Observable<AdaptivityElementContent> =
    new Observable<AdaptivityElementContent>();
  currentTaskID: Observable<number | null> = new Observable<number | null>(
    null
  );
  currentQuestionID: Observable<number | null> = new Observable<number | null>(
    null
  );
  footerText: Observable<string> = new Observable<string>("");

  isFinished: Observable<boolean> = new Observable<boolean>(false);
  currentElement: Observable<AdaptivityQuestion> =
    new Observable<AdaptivityQuestion>();
  evaluation = new Observable<Map<number, StyledButtonColor>>();
}
