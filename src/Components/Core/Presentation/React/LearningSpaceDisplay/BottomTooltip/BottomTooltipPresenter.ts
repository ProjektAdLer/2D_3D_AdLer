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
  points?: number;
  hasScored: Observable<boolean>;
  onClickCallback: () => void;
  xp?: number;
  isRequired?: boolean;
}

@injectable()
export default class BottomTooltipPresenter implements IBottomTooltipPresenter {
  dataQueue: BottomTooltipData[] = [];
  idCounter = 0;

  constructor(private viewModel: BottomTooltipViewModel) {}

  display(
    text: string,
    iconType: LearningElementTypeStrings | DoorTypeStrings,
    dataInput?: {
      points?: number;
      hasScored?: Observable<boolean>;
      xp?: number;
      isRequired?: boolean;
    },
    onClickCallback?: () => void,
  ): number {
    const data: BottomTooltipData = {
      id: this.idCounter++,
      show: true,
      text: text,
      iconType: iconType,
      points: dataInput?.points,
      hasScored: dataInput?.hasScored
        ? dataInput.hasScored
        : new Observable<boolean>(false),
      onClickCallback: onClickCallback ?? (() => {}),
      xp: dataInput?.xp,
      isRequired: dataInput?.isRequired,
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
    this.viewModel.gradingStyle = learningSpaceTO.gradingStyle;
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
      this.viewModel.onClickCallback.Value = data.onClickCallback;
      this.viewModel.hasScored = data.hasScored;
      this.viewModel.xp.Value = data.xp;
      this.viewModel.isRequired.Value = data.isRequired;
    }
  }
}
