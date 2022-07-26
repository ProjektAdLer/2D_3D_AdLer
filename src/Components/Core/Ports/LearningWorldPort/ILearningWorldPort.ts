import { LearningComponentID } from "../../Types/EnitityTypes";
import { LearningElementType } from "../../Presentation/Babylon/LearningElement/Types/LearningElementTypes";
import ILearningElementsDropdownPresenter from "../../Presentation/React/LearningElementsDropdown/ILearningElementsDropdownPresenter";
import AbstractLearningElement from "../../Domain/Entities/SpecificLearningElements/AbstractLearningElement";
import ILearningWorldNamePanelPresenter from "../../Presentation/React/LearningWorldNamePanel/ILearningWorldNamePanelPresenter";

export class LearningWorldTO {
  worldName: string;
  learningRooms: LearningRoomTO[];
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

  registerLearningWorldPanelPresenter(
    learningWorldPanelPresenter: ILearningWorldNamePanelPresenter
  ): void;
}
