import { LearningElementTO } from "../../../Application/LoadWorld/ILearningWorldPort";
import ILearningElementModalPresenter from "./ILearningElementModalPresenter";
import LearningElementModalViewModel from "./LearningElementModalViewModel";

export default class LearningElementModalPresenter
  implements ILearningElementModalPresenter
{
  constructor(private viewModel: LearningElementModalViewModel) {}

  presentLearningElementModal(learningeElementTO: LearningElementTO): void {
    this.viewModel.learningElementData.Value =
      learningeElementTO.learningElementData;
    this.viewModel.isOpen.Value = true;
    this.viewModel.id.Value = learningeElementTO.id;
  }
}
