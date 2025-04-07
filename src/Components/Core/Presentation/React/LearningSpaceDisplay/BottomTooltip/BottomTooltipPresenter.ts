import IBottomTooltipPresenter from "./IBottomTooltipPresenter";
import BottomTooltipViewModel from "./BottomTooltipViewModel";
import {
  LearningElementTypeStrings,
  LearningElementTypes,
} from "src/Components/Core/Domain/Types/LearningElementTypes";
import { injectable } from "inversify";
import LearningSpaceTO from "src/Components/Core/Application/DataTransferObjects/LearningSpaceTO";
import { DoorTypeStrings } from "src/Components/Core/Domain/Types/DoorTypes";
import Observable from "src/Lib/Observable";

interface BottomTooltipData {
  id: number;
  show: boolean;
  text: string;
  iconType: LearningElementTypeStrings | DoorTypeStrings;
  points: number;
  showPoints: boolean;
  hasScored: Observable<boolean>;
  onClickCallback: () => void;
}

@injectable()
export default class BottomTooltipPresenter implements IBottomTooltipPresenter {
  dataQueue: BottomTooltipData[] = [];
  idCounter = 0;

  constructor(private viewModel: BottomTooltipViewModel) {}

  display(
    text: string,
    iconType:
      | LearningElementTypeStrings
      | DoorTypeStrings = LearningElementTypes.notAnElement,
    points: number | undefined = undefined,
    hasScored: Observable<boolean> | undefined = undefined,
    onClickCallback?: () => void,
  ): number {
    const data: BottomTooltipData = {
      id: this.idCounter++,
      show: true,
      text: text,
      iconType: iconType,
      points: points ? points : 0,
      showPoints: points !== undefined,
      hasScored: hasScored ? hasScored : new Observable<boolean>(false),
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

  hideAll(): void {
    this.viewModel.show.Value = false;
  }

  show(): void {
    this.updateViewModel();
  }

  onLearningSpaceLoaded(learningSpaceTO: LearningSpaceTO): void {
    this.dataQueue = []; // prevents displaying tooltip of previous space
    this.viewModel.displayStrategy = learningSpaceTO.displayStrategy;
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
      this.viewModel.hasScored = data.hasScored;
    }
  }
}
