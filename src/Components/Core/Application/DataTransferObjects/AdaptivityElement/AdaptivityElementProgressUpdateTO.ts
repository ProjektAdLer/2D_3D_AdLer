export default class AdaptivityElementProgressUpdateTO {
  elementInfo: {
    elementId: number;
    success: boolean;
  };
  taskInfo: {
    taskId: number;
    taskStatus: string;
  };
  questionInfo: {
    id: number;
    status: string;
  };
}
