import { ComponentID } from "../../../Domain/Types/EntityTypes";
import { injectable } from "inversify";
import { Color3, Mesh, StandardMaterial, Vector3 } from "@babylonjs/core";
import Observable from "../../../../../Lib/Observable";
import AbstractViewModel from "../Abstract/AbstractViewModel";

@injectable()
export default class LearningSpaceViewModel extends AbstractViewModel {
  constructor() {
    super();
    this.wallColor.subscribe(this.setIsDirtyTrue);
    this.wallHeight.subscribe(this.setIsDirtyTrue);
    this.wallThickness.subscribe(this.setIsDirtyTrue);
    this.baseHeight.subscribe(this.setIsDirtyTrue);
    this.spaceCornerPoints.subscribe(this.setIsDirtyTrue);
    this.wallSegments.subscribe(this.setIsDirtyTrue);
  }

  public wallColor: Observable<Color3> = new Observable(
    new Color3(0.97, 0.95, 0.95)
  );
  public baseHeight: Observable<number> = new Observable(0);
  public doorWidth: Observable<number> = new Observable(0.95);
  public doorHeight: Observable<number> = new Observable(2.07);
  public wallHeight: Observable<number> = new Observable(2.85);
  public wallThickness: Observable<number> = new Observable(0.3);
  public wallGroundworkDepth: Observable<number> = new Observable(0.5);

  public spaceCornerPoints: Observable<Array<Vector3>> = new Observable();
  public wallSegments: Observable<Array<{ start: number; end: number }>> =
    new Observable();
  public floorMesh: Observable<Mesh> = new Observable<Mesh>();
  public wallMeshes: Observable<Mesh[]> = new Observable<Mesh[]>();
  public cornerPoleMeshes: Observable<Mesh[]> = new Observable<Mesh[]>();
  public floorMaterial: Observable<StandardMaterial> =
    new Observable<StandardMaterial>();
  public wallMaterial: Observable<StandardMaterial> =
    new Observable<StandardMaterial>();

  public id: ComponentID;

  public exitDoorPosition: Observable<[Vector3, number]> = new Observable<
    [Vector3, number]
  >();
  public entryDoorPosition: Observable<[Vector3, number]> = new Observable<
    [Vector3, number]
  >();

  public windowPositions: Observable<[Vector3, number][]> = new Observable<
    [Vector3, number][]
  >([]);

  public windowWidth: Observable<number> = new Observable(1.4);
  public windowHeight: Observable<number> = new Observable(1.6);
  public windowMeshes: Observable<Mesh[]> = new Observable<Mesh[]>();
}
