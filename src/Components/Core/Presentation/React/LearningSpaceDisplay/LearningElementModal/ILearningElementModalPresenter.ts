import LearningElementTO from "src/Components/Core/Application/DataTransferObjects/LearningElementTO";
import ILearningWorldAdapter from "src/Components/Core/Application/Ports/LearningWorldPort/ILearningWorldAdapter";
import { ComponentID } from "src/Components/Core/Domain/Types/EntityTypes";

export default interface ILearningElementModalPresenter
  extends ILearningWorldAdapter {
  onLearningElementLoaded(elementTO: LearningElementTO): void;
  onLearningElementScored(hasScored: boolean, elementID: ComponentID): void;
}
