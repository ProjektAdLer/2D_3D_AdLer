import { Mesh } from "@babylonjs/core";
import Observable from "../../../../../Lib/Observable";

export default class AvatarViewModel {
  public meshes = new Observable<Mesh[]>();
}
