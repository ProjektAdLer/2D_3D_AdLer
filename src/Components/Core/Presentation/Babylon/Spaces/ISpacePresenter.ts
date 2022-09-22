import SpaceTO from "src/Components/Core/Application/DataTransferObjects/SpaceTO";

export default interface ISpacePresenter {
  get SpaceId(): number;
  presentSpace(spaceTO: SpaceTO): void;
  openDoor(): void;
}
