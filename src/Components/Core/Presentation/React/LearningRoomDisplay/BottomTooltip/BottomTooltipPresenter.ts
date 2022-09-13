import IBottomTooltipPresenter from "./IBottomTooltipPresenter";
import BottomTooltipViewModel from "./BottomTooltipViewModel";
import LearningElementTO from "src/Components/Core/Application/DataTransportObjects/LearningElementTO";

export default class BottomTooltipPresenter implements IBottomTooltipPresenter {
  constructor(private viewModel: BottomTooltipViewModel) {}
  displayLearningElement(learningElement: LearningElementTO): void {
    this.viewModel.text.Value = learningElement.name;
    this.viewModel.iconType.Value = learningElement.learningElementData.type;
    this.viewModel.show.Value = true;
  }
  hide(): void {
    this.viewModel.show.Value = false;
  }
}
