import IBottomTooltipPresenter from "./IBottomTooltipPresenter";
import BottomTooltipViewModel from "./BottomTooltipViewModel";
import ElementTO from "src/Components/Core/Application/DataTransferObjects/ElementTO";

export default class BottomTooltipPresenter implements IBottomTooltipPresenter {
  constructor(private viewModel: BottomTooltipViewModel) {}
  displayElement(element: ElementTO): void {
    this.viewModel.text.Value = element.name;
    this.viewModel.iconType.Value = element.elementData.type;
    this.viewModel.show.Value = true;
  }
  hide(): void {
    this.viewModel.show.Value = false;
  }
}
