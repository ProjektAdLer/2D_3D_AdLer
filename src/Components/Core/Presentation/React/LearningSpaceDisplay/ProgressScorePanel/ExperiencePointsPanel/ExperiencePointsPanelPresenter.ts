import IExperiencePointsPanelPresenter from "./IExperiencePointsPanelPresenter";
import ExperiencePointsPanelViewModel from "./ExperiencePointsPanelViewModel";
import ExperiencePointsTO from "src/Components/Core/Application/DataTransferObjects/ExperiencePointsTO";

export default class ExperiencePointsPanelPresenter
  implements IExperiencePointsPanelPresenter
{
  constructor(private viewModel: ExperiencePointsPanelViewModel) {}

  onExperiencePointsUpdated(experiencePointsTO: ExperiencePointsTO): void {
    this.viewModel.xpInfo.Value = {
      currentLevel: experiencePointsTO.currentLevel,
      maxLevel: experiencePointsTO.maxLevel,
      currentXP:
        experiencePointsTO.currentExperiencePoints -
        experiencePointsTO.currentLevel * 100,
      numberOfLevelUps: experiencePointsTO.numberOfLevelUps,
    };
  }
}
