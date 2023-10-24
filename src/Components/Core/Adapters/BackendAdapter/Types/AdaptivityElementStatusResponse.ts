import { ComponentID } from "src/Components/Core/Domain/Types/EntityTypes";

export default class AdaptivtyElementStatusResponse {
  element: {
    elementID: ComponentID;
    success: boolean;
  };
  questions: {
    id: ComponentID;
    status: string;
    answers: {
      checked: boolean;
      correct: boolean;
    }[];
  }[];
  tasks: {
    taskId: ComponentID;
    taskStatus: string;
  }[];
}
