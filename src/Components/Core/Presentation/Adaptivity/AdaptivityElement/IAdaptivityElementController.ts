import { ComponentID } from "src/Components/Core/Domain/Types/EntityTypes";

export default interface IAdaptivityElementController {
  closeModal(): void;
  selectTask(taskID: number): void;
  selectQuestion(selectedQuestionID: number): void;
  submitSelection(elementId: ComponentID, selectedAnswers: number[]): void;
  closeFeedback(): void;
  closeAnswerSelection(): void;
  back(): void;
}
