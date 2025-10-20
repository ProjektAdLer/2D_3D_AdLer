import ILearningWorldAdapter from "src/Components/Core/Application/Ports/LearningWorldPort/ILearningWorldAdapter";
import ISettingsAdapter from "src/Components/Core/Application/Ports/SettingsPort/ISettingsAdapter";

export default interface IBadgeOverviewModalPresenter
  extends ILearningWorldAdapter,
    ISettingsAdapter {
  openModal(): void;
}
