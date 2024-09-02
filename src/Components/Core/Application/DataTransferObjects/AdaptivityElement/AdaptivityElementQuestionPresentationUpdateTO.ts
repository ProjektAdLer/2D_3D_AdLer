import { AdaptivityElementStatusTypes } from "src/Components/Core/Domain/Types/Adaptivity/AdaptivityElementStatusTypes";

export default class AdaptivityElementQuestionPresentationUpdateTO {
  taskInfo: {
    taskId: number;
  };
  questionInfo: {
    questionId: number;
    answers: [{ checked: boolean; correct: boolean }];
  };
}
