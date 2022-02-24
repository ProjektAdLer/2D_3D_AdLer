import { injectable, inject } from "inversify";
import IRoomGenerator from "./IRoomGenerator";
import { MeshBuilder, Vector4, Mesh } from "@babylonjs/core";
import Presentation from "../API/Presentation";
import CORE_TYPES from "../../DependencyInjection/types";

@injectable()
export default class RoomGenerator implements IRoomGenerator {
  private roomSize: any;
  private presentation: Presentation;
  constructor(@inject(CORE_TYPES.IPresentation) presentation: Presentation) {
    console.log("room generator roomsize:", this.roomSize);
    // this.roomSize = this.presentation.BusinessLogic.getRoomSize();
  }

  get RoomSize() {
    return this.roomSize;
  }

  createFloor() {
    const plane = MeshBuilder.CreatePlane("plane", {
      width: 20,
      height: 20,
      sideOrientation: Mesh.DOUBLESIDE,
    });
  }

  createWalls() {
    //todo set wall proportions + material
  }
}
