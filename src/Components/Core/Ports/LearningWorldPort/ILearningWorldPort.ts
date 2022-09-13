import { LearningComponentID } from "../../Domain/Types/EntityTypes";
import ILearningElementsDropdownPresenter from "../../Presentation/React/LearningRoomDisplay/LearningElementsDropdown/ILearningElementsDropdownPresenter";
import AbstractLearningElement from "../../Domain/Entities/SpecificLearningElements/AbstractLearningElement";
import ILearningWorldNamePanelPresenter from "../../Presentation/React/LearningRoomDisplay/LearningWorldNamePanel/ILearningWorldNamePanelPresenter";
import ILearningWorldGoalPanelPresenter from "~ReactComponents/LearningRoomDisplay/LearningWorldGoalPanel/ILearningWorldGoalPanelPresenter";
import LearningWorldTO from "../../Application/DataTransportObjects/LearningWorldTO";

export default interface ILearningWorldPort {
  presentLearningWorld(learningWorldTO: LearningWorldTO): void;

  registerLearningElementDropdownPresenter(
    learningElementDropdownPresenter: ILearningElementsDropdownPresenter
  ): void;

  registerLearningWorldNamePanelPresenter(
    learningWorldNamePanelPresenter: ILearningWorldNamePanelPresenter
  ): void;

  registerLearningWorldGoalPanelPresenter(
    learningWorldGoalPanelPresenter: ILearningWorldGoalPanelPresenter
  ): void;
}
