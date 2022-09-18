import { ElementID } from "../../Domain/Types/EntityTypes";
import IDropdownPresenter from "../../Presentation/React/SpaceDisplay/ElementsDropdown/IElementsDropdownPresenter";
import AbstractLearningElement from "../../Domain/Entities/ElementData/AbstractElementData";
import IWorldNamePanelPresenter from "../../Presentation/React/SpaceDisplay/WorldNamePanel/IWorldNamePanelPresenter";
import IWorldGoalPanelPresenter from "~ReactComponents/SpaceDisplay/WorldGoalPanel/IWorldGoalPanelPresenter";
import WorldTO from "../../Application/DataTransportObjects/WorldTO";

export default interface IWorldPort {
  presentWorld(worldTO: WorldTO): void;

  registerElementDropdownPresenter(
    elementDropdownPresenter: IDropdownPresenter
  ): void;

  registerWorldNamePanelPresenter(
    worldNamePanelPresenter: IWorldNamePanelPresenter
  ): void;

  registerWorldGoalPanelPresenter(
    worldGoalPanelPresenter: IWorldGoalPanelPresenter
  ): void;
}
