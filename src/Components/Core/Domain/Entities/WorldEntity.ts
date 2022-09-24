import SpaceEntity from "./SpaceEntity";

export default class WorldEntity {
  worldName: string;
  public spaces: SpaceEntity[];
  worldGoal: string;
  worldID: number;
}
