import LearningWorldTO from "src/Components/Core/Application/DataTransferObjects/LearningWorldTO";
import BadgeOverviewModalViewModel from "./BadgeOverviewModalViewModel";
import IBadgeOverviewModalPresenter from "./IBadgeOverviewModalPresenter";

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
}
