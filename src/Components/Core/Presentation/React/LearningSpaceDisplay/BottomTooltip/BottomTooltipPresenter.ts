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

  displayDoorTooltip(doorType: string): void {
    this.viewModel.show.Value = true;
    this.viewModel.iconType.Value = LearningElementTypes.notAnElement;
    this.viewModel.points.Value = undefined;
    if (doorType === "Exit") {
      this.viewModel.text.Value = "Ausgangstüre";
    }
    if (doorType === "Entry") {
      this.viewModel.text.Value = "Eingangstüre";
    }
  }

  displayLearningElementSummaryTooltip(elementData: {
    name: string;
    type: LearningElementTypeStrings;
    points: number | undefined;
  }): void {
    this.viewModel.show.Value = true;
    this.viewModel.text.Value = elementData.name;
    this.viewModel.iconType.Value = elementData.type;
    this.viewModel.points.Value = elementData.points;
  }

  hide(): void {
    this.viewModel.show.Value = false;
  }
}
