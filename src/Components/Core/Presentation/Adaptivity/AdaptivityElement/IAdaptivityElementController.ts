export default interface IAdaptivityElementController {
  closeModal(): void;
  selectTask(taskID: number): void;
  selectDifficulty(difficulty: number): void;
  submitSelection(): void;
  closeFeedback(): void;
  closeAnswerSelection(): void;
}
