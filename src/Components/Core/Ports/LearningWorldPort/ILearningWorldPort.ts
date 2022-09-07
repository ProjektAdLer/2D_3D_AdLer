import { LearningComponentID } from "../../Domain/Types/EntityTypes";
import ILearningElementsDropdownPresenter from "../../Presentation/React/LearningElementsDropdown/ILearningElementsDropdownPresenter";
import AbstractLearningElement from "../../Domain/Entities/SpecificLearningElements/AbstractLearningElement";
import ILearningWorldNamePanelPresenter from "../../Presentation/React/LearningWorldNamePanel/ILearningWorldNamePanelPresenter";
import ILearningWorldGoalPanelPresenter from "~ReactComponents/LearningWorldGoalPanel/ILearningWorldGoalPanelPresenter";

export class LearningWorldTO {
  worldName: string;
  learningRooms: LearningRoomTO[];
  worldGoal: string;
}

export class LearningRoomTO {
  id: LearningComponentID;
  learningElements: LearningElementTO[];
}

export class LearningElementTO {
  id: LearningComponentID;
  name: string;
  learningElementData: AbstractLearningElement;
}

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
