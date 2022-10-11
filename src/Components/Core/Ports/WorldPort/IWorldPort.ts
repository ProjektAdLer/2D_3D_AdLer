import ISpaceNamePanelPresenter from "../../Presentation/React/SpaceDisplay/SpaceNamePanel/ISpaceNamePanelPresenter";
import WorldTO from "../../Application/DataTransferObjects/WorldTO";

export default interface IWorldPort {
  presentWorld(worldTO: WorldTO): void;
}
