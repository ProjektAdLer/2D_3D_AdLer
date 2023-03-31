import LearningElementTO from "src/Components/Core/Application/DataTransferObjects/LearningElementTO";
import IElementModalPresenter from "./IElementModalPresenter";
import ElementModalViewModel from "./ElementModalViewModel";

export default class ElementModalPresenter implements IElementModalPresenter {
  constructor(private viewModel: ElementModalViewModel) {}

  onElementLoaded(elementTO: LearningElementTO): void {
    this.viewModel.isOpen.Value = true;
    this.viewModel.type.Value = elementTO.type;
    this.viewModel.id.Value = elementTO.id;
    this.viewModel.name.Value = elementTO.name;
    this.viewModel.filePath.Value = elementTO.filePath ?? "";
  }
}
