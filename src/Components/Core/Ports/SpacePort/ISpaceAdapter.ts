import SpaceTO from "../../Application/DataTransferObjects/SpaceTO";

export default interface ISpaceAdapter {
  onSpaceDataLoaded(spaceTO: SpaceTO): void;
}
