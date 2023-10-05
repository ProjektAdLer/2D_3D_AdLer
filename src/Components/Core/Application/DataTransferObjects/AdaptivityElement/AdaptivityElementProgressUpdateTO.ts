import { AdaptivityElementStatusTypes } from "src/Components/Core/Domain/Types/Adaptivity/AdaptivityElementStatusTypes";

export default class AdaptivityElementProgressUpdateTO {
  elementInfo: {
    elementId: number;
    success: boolean;
  };
  taskInfo: {
    taskId: number;
    taskStatus: AdaptivityElementStatusTypes;
  };
  questionInfo: {
    questionId: number;
    questionStatus: AdaptivityElementStatusTypes;
  };
}
