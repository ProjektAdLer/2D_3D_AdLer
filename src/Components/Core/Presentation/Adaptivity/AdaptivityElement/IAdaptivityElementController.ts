export default interface IAdaptivityElementController {
  closeModal(): void;
  selectTask(taskID: number): void;
  selectQuestion(questionID: number): void;
  selectHint(questionID: number, hintID: number): void;
  submitSelection(): void;
  closeFeedback(): void;
  closeAnswerSelection(): void;
  back(): void;
  showFooterTooltip(): void;
  hideFooterTooltip(): void;
}
