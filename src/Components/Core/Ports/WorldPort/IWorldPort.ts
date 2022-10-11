import { ElementID } from "../../Domain/Types/EntityTypes";
import IWorldNamePanelPresenter from "../../Presentation/React/SpaceDisplay/WorldNamePanel/IWorldNamePanelPresenter";
import IWorldGoalPanelPresenter from "~ReactComponents/SpaceDisplay/WorldGoalPanel/IWorldGoalPanelPresenter";
import WorldTO from "../../Application/DataTransferObjects/WorldTO";

export default interface IWorldPort {
  presentWorld(worldTO: WorldTO): void;

  registerWorldNamePanelPresenter(
    worldNamePanelPresenter: IWorldNamePanelPresenter
  ): void;

  registerWorldGoalPanelPresenter(
    worldGoalPanelPresenter: IWorldGoalPanelPresenter
  ): void;
}
