import { LearningElementTO } from "../../../Ports/LearningWorldPort/ILearningWorldPort";

export default interface IBottomTooltipPresenter {
  displayLearningElement(learningElement: LearningElementTO): void;
  hide(): void;
}
