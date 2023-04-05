import { Mesh } from "@babylonjs/core";
import Observable from "src/Lib/Observable";

export default class AmbienceViewModel {
  public meshes: Observable<Mesh[]> = new Observable<Mesh[]>([]);
}
