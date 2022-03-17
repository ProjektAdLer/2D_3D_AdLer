import { Vector3 } from "@babylonjs/core";
import { ROOMSIZE } from "../../BusinessLogic/RoomConfigurator/RoomConfigurator";

export default interface IRoomPresenter {
  get RoomSize(): ROOMSIZE;
  createFloor(): void;
  createWalls(): void;
  getLearningElementPositions(elementCount: number): [Vector3[], number[]];
}
