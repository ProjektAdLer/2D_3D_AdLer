import { Mesh, Vector3 } from "@babylonjs/core";
import { injectable } from "inversify";
import Observable from "../../../../Lib/Observable";
import { LearningElementType } from "./Types/LearningElementTypes";

@injectable()
export default class LearningElementViewModel {
  public id: string;
  public meshes: Observable<Mesh[]> = new Observable<Mesh[]>();
  public position: Observable<Vector3> = new Observable<Vector3>();
  public rotation: Observable<number> = new Observable<number>();
  public type: Observable<LearningElementType> =
    new Observable<LearningElementType>();
}
