export default class AdaptivityElementQuestionResponse {
  elementScore: {
    elementId: number;
    success: boolean;
  };
  gradedTask: {
    taskId: number;
    taskStatus: string;
  };
  gradedQuestion: {
    id: number;
    status: string;
    answer:
      | [
          {
            checked: boolean;
            correct: boolean;
          }
        ]
      | undefined;
  };
}
