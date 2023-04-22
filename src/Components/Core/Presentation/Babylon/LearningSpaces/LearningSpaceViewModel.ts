import { ComponentID } from "../../../Domain/Types/EntityTypes";
import { injectable } from "inversify";
import {
  Vector2,
  Color3,
  Mesh,
  StandardMaterial,
  Vector3,
} from "@babylonjs/core";
import Observable from "../../../../../Lib/Observable";
import AbstractViewModel from "../Abstract/AbstractViewModel";

@injectable()
export default class LearningSpaceViewModel extends AbstractViewModel {
  constructor() {
    super();
    this.wallColor.subscribe(this.setIsDirtyTrue);
    this.spaceWidth.subscribe(this.setIsDirtyTrue);
    this.wallHeight.subscribe(this.setIsDirtyTrue);
    this.spaceLength.subscribe(this.setIsDirtyTrue);
    this.wallThickness.subscribe(this.setIsDirtyTrue);
    this.baseHeight.subscribe(this.setIsDirtyTrue);
    this.spaceCornerPoints.subscribe(this.setIsDirtyTrue);
  }

  public wallColor: Observable<Color3> = new Observable(
    new Color3(0.97, 0.95, 0.95)
  );
  public spaceWidth: Observable<number> = new Observable(10);
  public spaceLength: Observable<number> = new Observable(8);
  public baseHeight: Observable<number> = new Observable(0);
  public doorWidth: Observable<number> = new Observable(0.95);
  public doorHeight: Observable<number> = new Observable(2.07);
  public wallHeight: Observable<number> = new Observable(2.5);
  public wallThickness: Observable<number> = new Observable(0.3);
  public wallGroundworkDepth: Observable<number> = new Observable(0.1);
  public spaceCornerPoints: Observable<Array<Vector2>> = new Observable([
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

  public id: ComponentID;

  public doorPosition: Observable<[Vector3, number]> = new Observable<
    [Vector3, number]
  >([new Vector3(0, 0, 0), 0]);

  public windowPosition: Observable<[Vector3, number]> = new Observable<
    [Vector3, number]
  >([new Vector3(0, 0, 0), 0]);

  public windowWidth: Observable<number> = new Observable(1.4);
  public windowHeight: Observable<number> = new Observable(1.6);
  public windowMeshes: Observable<Mesh[]> = new Observable<Mesh[]>();
}
