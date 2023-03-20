import { ComponentID } from "../../../Domain/Types/EntityTypes";
import { Mesh, Vector3 } from "@babylonjs/core";
import Observable from "../../../../../Lib/Observable";
import { ElementTypeStrings } from "src/Components/Core/Domain/Types/ElementTypes";

export default class ElementViewModel {
  public id: ComponentID;
  public meshes: Observable<Mesh[]> = new Observable<Mesh[]>();
  public position: Observable<Vector3> = new Observable<Vector3>();
  public rotation: Observable<number> = new Observable<number>();
  public name: Observable<string> = new Observable<string>();
  public type = new Observable<ElementTypeStrings>();
  public description = new Observable<string>();
  public goals = new Observable<string[]>();
  public value = new Observable<number>();
  public hasScored = new Observable<boolean>();
}
