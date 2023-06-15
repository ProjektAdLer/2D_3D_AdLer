import { Mesh, Vector3 } from "@babylonjs/core";
import Observable from "src/Lib/Observable";

export default class StandInDecorationViewModel {
  public modelMeshes: Observable<Mesh[]> = new Observable<Mesh[]>();
  public position: Observable<Vector3> = new Observable<Vector3>();
  public rotation: Observable<number> = new Observable<number>();
  public spaceName = new Observable<string>();
  public slotNumber = new Observable<number>();
}
