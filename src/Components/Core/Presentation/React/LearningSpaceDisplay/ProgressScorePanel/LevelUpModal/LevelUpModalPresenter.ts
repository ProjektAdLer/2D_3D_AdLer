import ExperiencePointsTO from "src/Components/Core/Application/DataTransferObjects/ExperiencePointsTO";
import { ILevelUpModalPresenter } from "./ILevelUpModalPresenter";
import LevelUpModalViewModel from "./LevelUpModalViewModel";

export default class LevelUpModalPresenter implements ILevelUpModalPresenter {
  constructor(private viewModel: LevelUpModalViewModel) {}

  onExperiencePointsUpdated(experiencePointsTO: ExperiencePointsTO): void {
    if (experiencePointsTO.numberOfLevelUps) {
      this.viewModel.isOpen.Value = true;
    }
  }
}
