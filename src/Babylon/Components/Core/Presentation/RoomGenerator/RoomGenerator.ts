import { injectable, inject } from "inversify";
import IRoomGenerator from "./IRoomGenerator";
import { MeshBuilder, Vector4, Mesh } from "@babylonjs/core";
import Presentation from "../API/Presentation";

@injectable()
export default class RoomGenerator implements IRoomGenerator {
  private roomSize: string;
  private presentation: Presentation;
  constructor(@inject(Presentation) presentation: Presentation) {
    this.roomSize = this.presentation.BusinessLogic.getRoomSize();
  }

  createWalls(roomSize: string) {
    //todo set wall proportions + material
  }
}
