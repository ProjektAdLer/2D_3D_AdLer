import ILearningWorldAdapter from "src/Components/Core/Application/Ports/LearningWorldPort/ILearningWorldAdapter";

export default interface IBadgeOverviewModalPresenter
  extends ILearningWorldAdapter {
  openModal(): void;
}
