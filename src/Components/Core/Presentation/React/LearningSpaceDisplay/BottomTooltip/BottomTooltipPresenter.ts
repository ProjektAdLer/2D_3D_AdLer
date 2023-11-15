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

  display(
    text: string,
    iconType: LearningElementTypeStrings = LearningElementTypes.notAnElement,
    points: number | undefined = undefined,
    onClickCallback?: () => void
  ): void {
    this.viewModel.show.Value = true;
    this.viewModel.text.Value = text;
    this.viewModel.iconType.Value = iconType;
    if (points) {
      this.viewModel.points.Value = points;
      this.viewModel.showPoints.Value = true;
    } else this.viewModel.showPoints.Value = false;
    if (onClickCallback) this.viewModel.onClickCallback.Value = onClickCallback;
  }

  hide(): void {
    this.viewModel.show.Value = false;

    this.viewModel.text.Value = "";
    this.viewModel.iconType.Value = LearningElementTypes.notAnElement;
    this.viewModel.showPoints.Value = false;
    this.viewModel.onClickCallback.Value = () => {};
  }
}
