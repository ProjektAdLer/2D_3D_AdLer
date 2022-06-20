import { injectable } from "inversify";
import { LearningElementTO } from "../../Application/LoadWorld/ILearningWorldPort";
import IBottomTooltipPresenter from "../../Presentation/React/BottomTooltip/IBottomTooltipPresenter";
import IUIPort from "./IUIPort";

@injectable()
export default class UIPort implements IUIPort {
  private bottomTooltipPresenter: IBottomTooltipPresenter;
  hide(): void {
    this.bottomTooltipPresenter.hide();
  }
  displayLearningElementTooltip = (learningElement: LearningElementTO) => {
    this.bottomTooltipPresenter.displayLearningElement(learningElement);
  };

  // Setter for presenters
  registerBottomTooltipPresenter(
    bottomTooltipPresenter: IBottomTooltipPresenter
  ): void {
    if (this.bottomTooltipPresenter) {
      throw new Error("BottomTooltipPresenter already registered");
    }
    this.bottomTooltipPresenter = bottomTooltipPresenter;
  }
}
