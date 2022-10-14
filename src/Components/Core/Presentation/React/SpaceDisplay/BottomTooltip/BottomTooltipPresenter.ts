import IBottomTooltipPresenter from "./IBottomTooltipPresenter";
import BottomTooltipViewModel from "./BottomTooltipViewModel";
import ElementTO from "src/Components/Core/Application/DataTransferObjects/ElementTO";

export default class BottomTooltipPresenter implements IBottomTooltipPresenter {
  constructor(private viewModel: BottomTooltipViewModel) {}
  displayElement(element: ElementTO): void {
    this.viewModel.text.Value = element.name;
    this.viewModel.iconType.Value = element.type;
    this.viewModel.show.Value = true;
    this.viewModel.points.Value = element.value;
  }
  hide(): void {
    this.viewModel.show.Value = false;
  }
}
