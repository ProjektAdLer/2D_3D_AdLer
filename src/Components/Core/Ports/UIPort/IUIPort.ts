import { LearningElementTO } from "../../Application/LoadWorld/ILearningWorldPort";
import IBottomTooltipPresenter from "../../Presentation/React/BottomTooltip/IBottomTooltipPresenter";

export default interface IUIPort {
  displayLearningElementTooltip(learningElement: LearningElementTO): void;
  hide(): void;
  registerBottomTooltipPresenter(
    bottomTooltipPresenter: IBottomTooltipPresenter
  ): void;
}
