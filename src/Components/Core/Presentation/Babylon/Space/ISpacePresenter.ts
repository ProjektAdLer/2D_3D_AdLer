import SpaceTO from "src/Components/Core/Application/DataTransportObjects/SpaceTO";

export default interface ISpacePresenter {
  get SpaceId(): number;
  presentSpace(spaceTO: SpaceTO): void;
  openDoor(): void;
}
