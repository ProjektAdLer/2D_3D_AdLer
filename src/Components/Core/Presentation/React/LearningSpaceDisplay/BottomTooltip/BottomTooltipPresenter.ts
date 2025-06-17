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
  elementXP: number | null; // Added for XP
  showXP: boolean; // Added for XP
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
    elementXP: number | null = null, // Added elementXP parameter
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
      elementXP: elementXP, // Populate elementXP
      showXP: elementXP !== null, // Populate showXP
    };
    this.dataQueue.push(data);

    // Log new values when adding to queue
    console.log(
      `BottomTooltipPresenter: Displaying new tooltip data (ID: ${data.id}) - elementXP: ${data.elementXP}, showXP: ${data.showXP}`,
    );

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
    // Also hide XP when all tooltips are hidden
    this.viewModel.showXP.Value = false;
    this.viewModel.elementXP.Value = null;
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
      this.viewModel.showPoints.Value = false; // Ensure points are hidden
      this.viewModel.showXP.Value = false; // Ensure XP is hidden
      this.viewModel.elementXP.Value = null; // Ensure XP value is reset
    } else {
      const data = this.dataQueue[this.dataQueue.length - 1];

      this.viewModel.show.Value = data.show;
      this.viewModel.text.Value = data.text;
      this.viewModel.iconType.Value = data.iconType;
      this.viewModel.points.Value = data.points;
      this.viewModel.showPoints.Value = data.showPoints;
      this.viewModel.onClickCallback.Value = data.onClickCallback;
      this.viewModel.hasScored = data.hasScored;
      this.viewModel.elementXP.Value = data.elementXP; // Update ViewModel with XP
      this.viewModel.showXP.Value = data.showXP; // Update ViewModel with XP visibility
    }
  }
}
