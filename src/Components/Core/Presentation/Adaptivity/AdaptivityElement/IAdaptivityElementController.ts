export default interface IAdaptivityElementController {
  closeModal(): void;
  selectTask(taskID: number): void;
  selectQuestion(selectedQuestionID: number): void;
  submitSelection(): void;
  closeFeedback(): void;
  closeAnswerSelection(): void;
  back(): void;
}
