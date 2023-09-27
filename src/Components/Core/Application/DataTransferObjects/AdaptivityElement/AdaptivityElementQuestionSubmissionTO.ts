import { ComponentID } from "src/Components/Core/Domain/Types/EntityTypes";

export default class AdaptivityElementQuestionSubmissionTO {
  worldID: ComponentID;
  elementID: ComponentID;
  taskID: number;
  questionID: number;
  selectedAnswerIDs: number[];
}
