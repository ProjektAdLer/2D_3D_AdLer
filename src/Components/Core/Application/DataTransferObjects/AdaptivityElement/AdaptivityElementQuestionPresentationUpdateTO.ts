export default class AdaptivityElementQuestionPresentationUpdateTO {
  taskInfo: {
    taskId: number;
  };
  questionInfo: {
    questionId: number;
    answers: { checked: boolean; correct: boolean }[];
  };
}
