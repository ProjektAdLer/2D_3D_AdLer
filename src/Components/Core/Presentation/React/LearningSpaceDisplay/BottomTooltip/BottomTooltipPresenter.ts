import IBottomTooltipPresenter from "./IBottomTooltipPresenter";
import BottomTooltipViewModel from "./BottomTooltipViewModel";
import {
  LearningElementTypeStrings,
  LearningElementTypes,
} from "src/Components/Core/Domain/Types/LearningElementTypes";
import { injectable } from "inversify";

interface BottomTooltipData {
  id: number;
  show: boolean;
  text: string;
  iconType: LearningElementTypeStrings;
  points: number;
  showPoints: boolean;
  onClickCallback: () => void;
}

@injectable()
export default class BottomTooltipPresenter implements IBottomTooltipPresenter {
  dataQueue: BottomTooltipData[] = [];
  idCounter = 0;

  constructor(private viewModel: BottomTooltipViewModel) {}

  display(
    text: string,
    iconType: LearningElementTypeStrings = LearningElementTypes.notAnElement,
    points: number | undefined = undefined,
    onClickCallback?: () => void
  ): number {
    const data: BottomTooltipData = {
      id: this.idCounter++,
      show: true,
      text: text,
      iconType: iconType,
      points: points ? points : 0,
      showPoints: points !== undefined,
      onClickCallback: onClickCallback ?? (() => {}),
    };
    this.dataQueue.push(data);

    this.updateViewModel();

    return data.id;
  }

  hide(toolTipId: number): void {
    const index = this.dataQueue.findIndex((data) => data.id === toolTipId);
    if (index >= 0) {
      this.dataQueue.splice(index, 1);
    }

    this.updateViewModel();
  }

  private updateViewModel(): void {
    if (this.dataQueue.length <= 0) {
      this.viewModel.show.Value = false;
    } else {
      const data = this.dataQueue[this.dataQueue.length - 1];

      this.viewModel.show.Value = data.show;
      this.viewModel.text.Value = data.text;
      this.viewModel.iconType.Value = data.iconType;
      this.viewModel.points.Value = data.points;
      this.viewModel.showPoints.Value = data.showPoints;
      this.viewModel.onClickCallback.Value = data.onClickCallback;
    }
  }
}
