import SpaceTO from "../../Application/DataTransportObjects/SpaceTO";

export default interface ISpaceAdapter {
  onSpaceDataLoaded(spaceTO: SpaceTO): void;
}
