import { LearningElementTO } from "../../../Application/LoadWorld/ILearningWorldPort";
import ILearningElementModalPresenter from "./ILearningElementModalPresenter";
import LearningElementModalViewModel from "./LearningElementModalViewModel";

export default class LearningElementModalPresenter
  implements ILearningElementModalPresenter
{
  constructor(private viewModel: LearningElementModalViewModel) {}

  presentLearningElementModal(learningeElementTO: LearningElementTO): void {
    this.viewModel.type.Value = learningeElementTO.type;
    this.viewModel.isOpen.Value = true;
  }
}
