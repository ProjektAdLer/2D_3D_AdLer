import { LearningComponentID } from "./../../../Types/EnitityTypes";
import { Mesh, Vector3 } from "@babylonjs/core";
import Observable from "../../../../../Lib/Observable";
import { LearningElementType } from "./Types/LearningElementTypes";

export default class LearningElementViewModel {
  public id: LearningComponentID;
  public meshes: Observable<Mesh[]> = new Observable<Mesh[]>();
  public position: Observable<Vector3> = new Observable<Vector3>();
  public rotation: Observable<number> = new Observable<number>();
  public type: Observable<LearningElementType> =
    new Observable<LearningElementType>();
}
