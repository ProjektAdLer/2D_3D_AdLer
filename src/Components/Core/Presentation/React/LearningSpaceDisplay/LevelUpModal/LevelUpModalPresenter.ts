import ExperiencePointsTO from "src/Components/Core/Application/DataTransferObjects/ExperiencePointsTO";
import { ILevelUpModalPresenter } from "./ILevelUpModalPresenter";
import LevelUpModalViewModel from "./LevelUpModalViewModel";
import LearningWorldTO from "src/Components/Core/Application/DataTransferObjects/LearningWorldTO";
import SettingsTO from "src/Components/Core/Application/DataTransferObjects/SettingsTO";

export default class LevelUpModalPresenter implements ILevelUpModalPresenter {
  constructor(private viewModel: LevelUpModalViewModel) {}

  onExperiencePointsUpdated(experiencePointsTO: ExperiencePointsTO): void {
    if (experiencePointsTO.numberOfLevelUps) {
      this.viewModel.isOpen.Value = true;
      if (experiencePointsTO.currentLevel < 0) {
        this.viewModel.level = 0;
      } else if (experiencePointsTO.currentLevel > 10) {
        this.viewModel.level = 10;
      } else this.viewModel.level = experiencePointsTO.currentLevel;
    }
  }
  onLearningWorldEntityLoaded(learningWorldTO: LearningWorldTO): void {
    this.viewModel.worldTheme = learningWorldTO.theme;
  }

  onSettingsUpdated(settings: SettingsTO): void {
    this.viewModel.language = settings.language ?? "de";
  }
}
