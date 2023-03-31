import IBottomTooltipPresenter from "./IBottomTooltipPresenter";
import BottomTooltipViewModel from "./BottomTooltipViewModel";
import LearningElementTO from "src/Components/Core/Application/DataTransferObjects/LearningElementTO";
import { ElementTypes } from "src/Components/Core/Domain/Types/ElementTypes";
import { injectable } from "inversify";

@injectable()
export default class BottomTooltipPresenter implements IBottomTooltipPresenter {
  constructor(private viewModel: BottomTooltipViewModel) {}

  displayExitQueryTooltip(): void {
    this.viewModel.show.Value = true;
    this.viewModel.text.Value = "Raum verlassen?";
    this.viewModel.iconType.Value = ElementTypes.notAnElement;
    this.viewModel.points.Value = undefined;
  }

  displayElementSummaryTooltip(element: LearningElementTO): void {
    this.viewModel.show.Value = true;
    this.viewModel.text.Value = element.name;
    this.viewModel.iconType.Value = element.type;
    this.viewModel.points.Value = element.value;
  }

  hide(): void {
    this.viewModel.show.Value = false;
  }
}
