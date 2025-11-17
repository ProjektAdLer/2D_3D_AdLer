import LearningElementTO from "src/Components/Core/Application/DataTransferObjects/LearningElementTO";
import ILearningWorldAdapter from "src/Components/Core/Application/Ports/LearningWorldPort/ILearningWorldAdapter";
import ISettingsAdapter from "src/Components/Core/Application/Ports/SettingsPort/ISettingsAdapter";
import { ComponentID } from "src/Components/Core/Domain/Types/EntityTypes";

export default interface ILearningElementModalPresenter
  extends ILearningWorldAdapter,
    ISettingsAdapter {
  onLearningElementLoaded(elementTO: LearningElementTO): void;
  onLearningElementScored(hasScored: boolean, elementID: ComponentID): void;
}
