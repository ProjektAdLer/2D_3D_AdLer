import { AdaptivityElementQuestionDifficultyTypes } from "src/Components/Core/Domain/Types/Adaptivity/AdaptivityElementQuestionDifficultyTypes";
import { AdaptivityElementActionTypes } from "src/Components/Core/Domain/Types/Adaptivity/AdaptivityElementActionTypes";
import Observable from "src/Lib/Observable";
import { ComponentID } from "src/Components/Core/Domain/Types/EntityTypes";

export interface AdaptivityAnswer {
  answerIndex: number;
  answerText: string;
  isSelected: boolean;
}

export interface AdaptivityHintAction {
  hintActionType: AdaptivityElementActionTypes;
  hintActionData: string | number;
}

export interface AdaptivityHint {
  hintID: number;
  showOnIsWrong: boolean;
  hintAction: AdaptivityHintAction;
}

export interface AdaptivityQuestion {
  questionID: number;
  questionText: string;
  questionAnswers: AdaptivityAnswer[];
  isRequired: boolean;
  isCompleted: boolean | null;
  difficulty: AdaptivityElementQuestionDifficultyTypes;
  isMultipleChoice: boolean;
  hints: AdaptivityHint[];
}

export interface AdaptivityTask {
  taskID: number;
  taskTitle: string;
  questions: AdaptivityQuestion[];
  isCompleted: boolean | null;
  requiredDifficulty: number;
  isRequired: boolean;
}

export interface AdaptivityElementContent {
  elementName: string;
  introText: string;
  tasks: AdaptivityTask[];
}

export default class AdaptivityElementViewModel {
  isOpen: Observable<boolean> = new Observable<boolean>(false);
  showFooterTooltip: Observable<boolean> = new Observable<boolean>(false);
  showFeedback: Observable<boolean> = new Observable<boolean>(false);
  contentData: Observable<AdaptivityElementContent> =
    new Observable<AdaptivityElementContent>();
  currentTask: Observable<AdaptivityTask | null> =
    new Observable<AdaptivityTask | null>(null);
  currentQuestion: Observable<AdaptivityQuestion | null> =
    new Observable<AdaptivityQuestion | null>(null);
  selectedHint: Observable<AdaptivityHint | null> =
    new Observable<AdaptivityHint | null>(null);
  footerText: Observable<string> = new Observable<string>("");
  elementID: Observable<ComponentID> = new Observable<ComponentID>();
}
