import { Mesh, Vector3 } from "@babylonjs/core";
import Observable from "src/Lib/Observable";

export default class StandInDecorationViewModel {
  public modelMeshes: Mesh[];
  public position: Vector3;
  public rotation: number;
  public spaceName: string;
  public slotNumber: number;
}
