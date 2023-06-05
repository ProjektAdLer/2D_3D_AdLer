import { ComponentID } from "../../../Domain/Types/EntityTypes";
import { Mesh, Vector3 } from "@babylonjs/core";
import Observable from "../../../../../Lib/Observable";
import { LearningElementTypeStrings } from "src/Components/Core/Domain/Types/LearningElementTypes";

export default class LearningElementViewModel {
  public id: ComponentID;
  public iconScaleUpOnHover: number = 1.007;
  public iconYOffset: number = 2.3;
  public modelMeshes: Observable<Mesh[]> = new Observable<Mesh[]>();
  public iconMeshes: Observable<Mesh[]> = new Observable<Mesh[]>();
  public position: Observable<Vector3> = new Observable<Vector3>();
  public rotation: Observable<number> = new Observable<number>();
  public name: Observable<string> = new Observable<string>();
  public type = new Observable<LearningElementTypeStrings>();
  public description = new Observable<string>();
  public goals = new Observable<string[]>();
  public value = new Observable<number>();
  public hasScored = new Observable<boolean>();
}
