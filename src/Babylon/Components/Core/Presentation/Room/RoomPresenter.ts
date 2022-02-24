import { injectable, inject } from "inversify";
import IRoomPresenter from "./IRoomPresenter";
import { MeshBuilder, Mesh } from "@babylonjs/core";
import Presentation from "../API/Presentation";
import CORE_TYPES from "../../DependencyInjection/types";

@injectable()
export default class RoomPresenter implements IRoomPresenter {
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
