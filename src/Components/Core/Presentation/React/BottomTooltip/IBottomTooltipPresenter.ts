import LearningElementTO from "src/Components/Core/Application/DataTransportObjects/LearningElementTO";

export default interface IBottomTooltipPresenter {
  displayLearningElement(learningElement: LearningElementTO): void;
  hide(): void;
}
