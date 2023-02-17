import ElementTO from "src/Components/Core/Application/DataTransferObjects/ElementTO";
import IElementModalPresenter from "./IElementModalPresenter";
import ElementModalViewModel from "./ElementModalViewModel";

export default class ElementModalPresenter implements IElementModalPresenter {
  constructor(private viewModel: ElementModalViewModel) {}

  onElementLoaded(elementTO: ElementTO): void {
    this.viewModel.type.Value = elementTO.type;
    this.viewModel.isOpen.Value = true;
    this.viewModel.id.Value = elementTO.id;
    this.viewModel.parentSpaceID.Value = elementTO.parentSpaceID;
    this.viewModel.parentCourseID.Value = elementTO.parentCourseID;
    this.viewModel.name.Value = elementTO.name;
    this.viewModel.filePath.Value = elementTO.filePath ?? "";
  }
}
