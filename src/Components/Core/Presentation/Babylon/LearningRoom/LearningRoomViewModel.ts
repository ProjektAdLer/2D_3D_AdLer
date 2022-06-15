import { LearningComponentID } from "./../../../Types/EnitityTypes";
import { injectable } from "inversify";
import { Color3, Mesh, Scene, StandardMaterial } from "@babylonjs/core";
import Observable from "../../../../../Lib/Observable";

@injectable()
export default class LearningRoomViewModel {
  public wallColor: Observable<Color3> = new Observable(
    new Color3(0.97, 0.95, 0.95)
  );
  public roomWidth: Observable<number> = new Observable(10);
  public roomLength: Observable<number> = new Observable(10);
  public baseHeight: Observable<number> = new Observable(0.5);
  public roomHeight: Observable<number> = new Observable(1.5);
  public doorWidth: Observable<number> = new Observable(1.0);
  public doorHeight: Observable<number> = new Observable(2.19);
  public wallThickness: Observable<number> = new Observable(0.3);

  public floorMesh: Observable<Mesh> = new Observable<Mesh>();
  public wallMesh: Observable<Mesh> = new Observable<Mesh>();
  public floorMaterial: Observable<StandardMaterial> =
    new Observable<StandardMaterial>();
  public wallMaterial: Observable<StandardMaterial> =
    new Observable<StandardMaterial>();

  public id: LearningComponentID;
}
