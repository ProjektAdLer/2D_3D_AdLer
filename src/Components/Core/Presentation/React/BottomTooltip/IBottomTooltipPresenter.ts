import { LearningElementTO } from "../../../Application/LoadWorld/ILearningWorldPort";

export default interface IBottomTooltipPresenter {
  displayLearningElement(learningElement: LearningElementTO): void;
  hide(): void;
}
