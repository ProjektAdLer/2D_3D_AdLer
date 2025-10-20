import ILearningWorldAdapter from "src/Components/Core/Application/Ports/LearningWorldPort/ILearningWorldAdapter";
import ISettingsAdapter from "src/Components/Core/Application/Ports/SettingsPort/ISettingsAdapter";

export interface ILevelUpModalPresenter
  extends ILearningWorldAdapter,
    ISettingsAdapter {}
