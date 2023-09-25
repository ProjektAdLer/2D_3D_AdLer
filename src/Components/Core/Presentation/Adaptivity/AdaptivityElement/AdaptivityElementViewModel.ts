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
  questionPoints: number;
  questionAnswers: AdaptivityAnswer[];
  isRequired: boolean;
  isCompleted: boolean;
}

export interface AdaptivityTask {
  taskID: number;
  taskTitle: string;
  questions: AdaptivityQuestion[];
  isCompleted: boolean;
}

export interface AdaptivityElementContent {
  elementName: string;
  introText: string;
  tasks: AdaptivityTask[];
}

export default class AdaptivityElementViewModel {
  isOpen: Observable<boolean> = new Observable<boolean>(false);
  contentData: Observable<AdaptivityElementContent> =
    new Observable<AdaptivityElementContent>(testAdaptivityElementContent);
  currentTaskID: Observable<number | null> = new Observable<number | null>(
    null
  );
  currentQuestionID: Observable<number | null> = new Observable<number | null>(
    null
  );

  isFinished: Observable<boolean> = new Observable<boolean>(false);
  currentElement: Observable<AdaptivityQuestion> =
    new Observable<AdaptivityQuestion>();
  evaluation = new Observable<Map<number, StyledButtonColor>>();
}

const testAdaptivityElementContent: AdaptivityElementContent = {
  elementName: "PLACEHOLDER_NAME",
  introText: "PLACEHOLDER_INTRO_TEXT",
  tasks: [
    {
      taskID: 1,
      taskTitle: "PLACEHOLDER_TASK_TITLE_1",
      isCompleted: true,
      questions: [
        {
          questionID: 1,
          questionText: "PLACEHOLDER_QUESTION_TEXT",
          questionPoints: 1,
          isRequired: true,
          isCompleted: true,
          questionAnswers: [
            {
              answerIndex: 1,
              answerText: "PLACEHOLDER_ANSWER_TEXT",
              isSelected: false,
            },
          ],
        },
      ],
    },
    {
      taskID: 2,
      taskTitle: "PLACEHOLDER_TASK_TITLE_2",
      isCompleted: false,
      questions: [
        {
          questionID: 2,
          questionText: "PLACEHOLDER_QUESTION_TEXT",
          questionPoints: 1,
          isRequired: false,
          isCompleted: false,
          questionAnswers: [
            {
              answerIndex: 1,
              answerText: "PLACEHOLDER_ANSWER_TEXT",
              isSelected: false,
            },
          ],
        },
      ],
    },
  ],
};
