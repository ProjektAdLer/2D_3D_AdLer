import { LearningComponentID } from "../../../Domain/Types/EntityTypes";
import { injectable } from "inversify";
import { Vector2, Color3, Mesh, StandardMaterial } from "@babylonjs/core";
import Observable from "../../../../../Lib/Observable";

@injectable()
export default class LearningRoomViewModel {
  public wallColor: Observable<Color3> = new Observable(
    new Color3(0.97, 0.95, 0.95)
  );
  public roomWidth: Observable<number> = new Observable(10);
  public roomLength: Observable<number> = new Observable(8);
  public baseHeight: Observable<number> = new Observable(0);
  public roomHeight: Observable<number> = new Observable(1.5);
  public doorWidth: Observable<number> = new Observable(1.0);
  public doorHeight: Observable<number> = new Observable(2.19);
  public wallThickness: Observable<number> = new Observable(0.3);
  public roomCornerPoints: Observable<Array<Vector2>> = new Observable([
    new Vector2(5.3, 4.3),
    new Vector2(-5.3, 4.3),
    new Vector2(-5.3, -4.3),
    new Vector2(5.3, -4.3),
  ]);

  public floorMesh: Observable<Mesh> = new Observable<Mesh>();
  public wallMeshes: Observable<Mesh[]> = new Observable<Mesh[]>();
  public cornerPoleMeshes: Observable<Mesh[]> = new Observable<Mesh[]>();
  public floorMaterial: Observable<StandardMaterial> =
    new Observable<StandardMaterial>();
  public wallMaterial: Observable<StandardMaterial> =
    new Observable<StandardMaterial>();

  public id: LearningComponentID;
}
