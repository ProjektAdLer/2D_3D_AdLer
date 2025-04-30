import LearningWorldTO from "src/Components/Core/Application/DataTransferObjects/LearningWorldTO";
import { IProgressScorePanelPresenter } from "./IProgressScorePanelPresenter";
import ProgressScorePanelViewModel from "./ProgessScorePanelViewModel";
import PointBasedDisplay from "../../../Utils/ElementCompletionDisplay/PointBasedDisplay";
import { GradingStyle } from "src/Components/Core/Domain/Types/GradingStyle";

export default class ProgressScorePanelPresenter
  implements IProgressScorePanelPresenter
{
  constructor(private viewModel: ProgressScorePanelViewModel) {}

  onLearningWorldEntityLoaded(learningWorldTO: LearningWorldTO): void {
    if (learningWorldTO.gradingStyle instanceof PointBasedDisplay) {
      this.viewModel.gradingStyle = GradingStyle.point;
    } else {
      this.viewModel.gradingStyle = GradingStyle.requirement;
    }
  }
}
