import LearningElementTO from "src/Components/Core/Application/DataTransferObjects/LearningElementTO";
import ILearningElementModalPresenter from "./ILearningElementModalPresenter";
import LearningElementModalViewModel from "./LearningElementModalViewModel";

export default class LearningElementModalPresenter
  implements ILearningElementModalPresenter
{
  constructor(private viewModel: LearningElementModalViewModel) {}

  onLearningElementLoaded(elementTO: LearningElementTO): void {
    this.viewModel.type.Value = elementTO.type;
    this.viewModel.id.Value = elementTO.id;
    this.viewModel.name.Value = elementTO.name;
    this.viewModel.filePath.Value = elementTO.filePath ?? "";
    this.viewModel.isScoreable.Value = elementTO.isScoreable;

    if (this.viewModel.isScoreable.Value) {
      this.viewModel.isVisible.Value = false;
      this.viewModel.isOpen.Value = true;
      setTimeout(() => {
        this.viewModel.isVisible.Value = true;
      }, this.viewModel.openDelay);
    } else {
      this.viewModel.isOpen.Value = true;
    }
  }
}
