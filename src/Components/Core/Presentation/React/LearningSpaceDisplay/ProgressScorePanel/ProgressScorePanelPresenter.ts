import LearningWorldTO from "src/Components/Core/Application/DataTransferObjects/LearningWorldTO";
import { IProgressScorePanelPresenter } from "./IProgressScorePanelPresenter";
import ProgressScorePanelViewModel from "./ProgessScorePanelViewModel";
import PointBasedDisplay from "../../../Utils/ElementCompletionDisplay/PointBasedDisplay";

export default class ProgressScorePanelPresenter
  implements IProgressScorePanelPresenter
{
  constructor(private viewModel: ProgressScorePanelViewModel) {}

  onLearningWorldEntityLoaded(learningWorldTO: LearningWorldTO): void {
    if (learningWorldTO.displayStrategy instanceof PointBasedDisplay) {
      this.viewModel.displayStrategy = "point-based";
    } else {
      this.viewModel.displayStrategy = "point-based";
    }
  }
}
