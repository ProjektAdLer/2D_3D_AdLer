import { Mesh, Vector3 } from "@babylonjs/core";
import Observable from "../../../../../Lib/Observable";

export default class DoorViewModel {
  public isVisible: Observable<boolean> = new Observable<boolean>(false);
  public meshes: Observable<Mesh[]> = new Observable<Mesh[]>([]);
  public position: Observable<Vector3> = new Observable(new Vector3(0, 0, 0));
  public rotation: Observable<number> = new Observable(0);
  public isOpen: Observable<boolean> = new Observable<boolean>(false);
}
