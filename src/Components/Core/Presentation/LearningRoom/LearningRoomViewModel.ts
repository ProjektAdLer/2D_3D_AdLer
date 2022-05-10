import { injectable } from "inversify";
import { Color3, Mesh, Scene, StandardMaterial } from "@babylonjs/core";
import Observable from "../../../../Lib/Observable";

@injectable()
export default class LearningRoomViewModel {
  public scene: Observable<Scene> = new Observable<Scene>();
  public wallColor: Observable<Color3> = new Observable(
    new Color3(0.3, 0.6, 0.8)
  );
  public roomWidth: Observable<number> = new Observable(10);
  public roomLength: Observable<number> = new Observable(10);
  public baseHeight: Observable<number> = new Observable(0.5);
  public roomHeight: Observable<number> = new Observable(1);
  public doorWidth: Observable<number> = new Observable(1.5);
  public doorHeight: Observable<number> = new Observable(2.28);
  public wallThickness: Observable<number> = new Observable(0.3);

  public floorMesh: Observable<Mesh> = new Observable<Mesh>();
  public wallMesh: Observable<Mesh> = new Observable<Mesh>();
  public floorMaterial: Observable<StandardMaterial> =
    new Observable<StandardMaterial>();
  public wallMaterial: Observable<StandardMaterial> =
    new Observable<StandardMaterial>();

  public id: string;
}
