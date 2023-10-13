import { ComponentID } from "src/Components/Core/Domain/Types/EntityTypes";

export default class AdaptivityElementQuestionSubmissionTO {
  elementID: ComponentID;
  taskID: number;
  questionID: number;
  selectedAnswerIDs: number[];
}
