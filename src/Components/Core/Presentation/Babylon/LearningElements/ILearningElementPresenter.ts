import { ComponentID } from "src/Components/Core/Domain/Types/EntityTypes";
import ILearningWorldAdapter from "src/Components/Core/Application/Ports/LearningWorldPort/ILearningWorldAdapter";

export default interface ILearningElementPresenter
  extends ILearningWorldAdapter {
  onLearningElementScored(hasScored: boolean, elementID: ComponentID): void;
}
