import LearningWorldTO from "src/Components/Core/Application/DataTransferObjects/LearningWorldTO";
import BadgeOverviewModalViewModel from "./BadgeOverviewModalViewModel";
import IBadgeOverviewModalPresenter from "./IBadgeOverviewModalPresenter";
import ExperiencePointsTO from "src/Components/Core/Application/DataTransferObjects/ExperiencePointsTO";
import SettingsTO from "src/Components/Core/Application/DataTransferObjects/SettingsTO";

export default class BadgeOverviewModalPresenter
  implements IBadgeOverviewModalPresenter
{
  constructor(private viewModel: BadgeOverviewModalViewModel) {}

  openModal(): void {
    this.viewModel.isOpen.Value = true;
  }
  onLearningWorldEntityLoaded(world: LearningWorldTO): void {
    this.viewModel.worldTheme = world.theme;
  }
  onExperiencePointsUpdated(experiencePointsTO: ExperiencePointsTO): void {
    this.viewModel.currentLevel.Value = experiencePointsTO.currentLevel;
  }
  onSettingsUpdated(settings: SettingsTO): void {
    this.viewModel.language = settings.language ?? "de";
  }
}
