import ILearningWorldAdapter from "src/Components/Core/Application/Ports/LearningWorldPort/ILearningWorldAdapter";

export default interface ILearningSpaceGoalPanelPresenter
  extends ILearningWorldAdapter {
  openOrCloseGoals(): void;
  onLearningSpaceLoaded(spaceTO: any): void;
}
