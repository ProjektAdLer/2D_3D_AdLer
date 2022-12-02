import ElementTO from "src/Components/Core/Application/DataTransferObjects/ElementTO";
import IElementModalPresenter from "./IElementModalPresenter";
import ElementModalViewModel from "./ElementModalViewModel";

export default class ElementModalPresenter implements IElementModalPresenter {
  constructor(private viewModel: ElementModalViewModel) {}

  presentElementModal(elementTO: ElementTO): void {
    this.viewModel.type.Value = elementTO.type;
    this.viewModel.isOpen.Value = true;
    this.viewModel.id.Value = elementTO.id;
    this.viewModel.parentSpaceId.Value = elementTO.parentSpaceId;
    this.viewModel.parentCourseId.Value = elementTO.parentCourseId;
    this.viewModel.name.Value = elementTO.name;
    this.viewModel.filePath.Value = elementTO.filePath ?? "";
  }
}
