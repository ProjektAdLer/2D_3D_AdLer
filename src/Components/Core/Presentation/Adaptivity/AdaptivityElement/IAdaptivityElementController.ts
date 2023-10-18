import { ComponentID } from "src/Components/Core/Domain/Types/EntityTypes";

export default interface IAdaptivityElementController {
  closeModal(): void;
  selectTask(taskID: number): void;
  selectQuestion(questionID: number): void;
  selectHint(questionID: number, hintID: number): void;
  submitSelection(selectedAnswers: number[]): void;
  closeFeedback(): void;
  closeAnswerSelection(): void;
  back(): void;
  showFooterTooltip(): void;
  hideFooterTooltip(): void;
}
