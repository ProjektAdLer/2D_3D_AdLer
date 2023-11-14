import IBottomTooltipPresenter from "./IBottomTooltipPresenter";
import BottomTooltipViewModel from "./BottomTooltipViewModel";
import {
  LearningElementTypeStrings,
  LearningElementTypes,
} from "src/Components/Core/Domain/Types/LearningElementTypes";
import { injectable } from "inversify";

@injectable()
export default class BottomTooltipPresenter implements IBottomTooltipPresenter {
  constructor(private viewModel: BottomTooltipViewModel) {}

  displayDoorTooltip(isExit: boolean): void {
    this.viewModel.show.Value = true;
    this.viewModel.iconType.Value = LearningElementTypes.notAnElement;
    this.viewModel.points.Value = 0;
    this.viewModel.showPoints.Value = false;
    if (isExit) this.viewModel.text.Value = "Ausgangstüre";
    else this.viewModel.text.Value = "Eingangstüre";
  }

  displayLearningElementSummaryTooltip(elementData: {
    name: string;
    type: LearningElementTypeStrings;
    points: number;
  }): void {
    this.viewModel.show.Value = true;
    this.viewModel.text.Value = elementData.name;
    this.viewModel.iconType.Value = elementData.type;
    this.viewModel.points.Value = elementData.points;
    this.viewModel.showPoints.Value = true;
  }

  display(
    text: string,
    iconType: LearningElementTypeStrings = LearningElementTypes.notAnElement,
    points: number | undefined = undefined
  ): void {
    this.viewModel.show.Value = true;
    this.viewModel.text.Value = text;
    this.viewModel.iconType.Value = iconType;
    if (points) {
      this.viewModel.points.Value = points;
      this.viewModel.showPoints.Value = true;
    } else this.viewModel.showPoints.Value = false;
  }

  hide(): void {
    this.viewModel.show.Value = false;
  }
}
