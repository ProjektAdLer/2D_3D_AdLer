import LearningElementTO from "src/Components/Core/Application/DataTransferObjects/LearningElementTO";
import ILearningWorldAdapter from "src/Components/Core/Application/Ports/LearningWorldPort/ILearningWorldAdapter";

export default interface ILearningElementModalPresenter
  extends ILearningWorldAdapter {
  onLearningElementLoaded(elementTO: LearningElementTO): void;
}
