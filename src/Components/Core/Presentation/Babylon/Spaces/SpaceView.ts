// earcut is needed for triangulation used in the Babylon PolyMeshBuilder
// see also: https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/param/polyMeshBuilder
import * as earcut from "earcut";
(window as any).earcut = earcut;

import {
  Path2,
  StandardMaterial,
  Texture,
  PolygonMeshBuilder,
  MeshBuilder,
  Mesh,
} from "@babylonjs/core";
import SpaceViewModel from "./SpaceViewModel";
import floorTexture from "../../../../../Assets/Texture_Floor_Parquet3.png";
import ISpaceController from "./ISpaceController";
import ISpaceView from "./ISpaceView";
import IScenePresenter from "../SceneManagement/IScenePresenter";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import SCENE_TYPES, {
  ScenePresenterFactory,
} from "~DependencyInjection/Scenes/SCENE_TYPES";
import SpaceSceneDefinition from "../SceneManagement/Scenes/SpaceSceneDefinition";
import bind from "bind-decorator";

export default class SpaceView implements ISpaceView {
  private scenePresenter: IScenePresenter;

  constructor(
    private viewModel: SpaceViewModel,
    private controller: ISpaceController
  ) {
    let scenePresenterFactory = CoreDIContainer.get<ScenePresenterFactory>(
      SCENE_TYPES.ScenePresenterFactory
    );
    this.scenePresenter = scenePresenterFactory(SpaceSceneDefinition);

    if (!this.viewModel)
      throw new Error(
        "ViewModel is not set! Check if the builder is set up properly."
      );

    this.scenePresenter.Scene.onBeforeRenderObservable.add(this.displaySpace);

    // TODO: setup subscription cancellations
  }

  @bind
  public displaySpace(): void {
    if (!this.viewModel.isDirty) return;

    // Errorhandling: Check if cornerCount is higher than 2
    if (this.viewModel.spaceCornerPoints.Value.length < 3)
      throw new Error(
        "Not enough corners found to generate space. Please review the Spacedata."
      );
    this.cleanupOldWalls();
    this.cleanupOldPoles();
    this.cleanupOldFloor();
    this.createWalls();
    this.createWallCornerPoles();
    this.createFloor();

    this.viewModel.isDirty = false;
  }

  private cleanupOldFloor(): void {
    if (!this.viewModel.floorMesh.Value) {
      return;
    }
    const floorMesh = this.viewModel.floorMesh.Value;
    floorMesh.dispose();
  }
  private cleanupOldPoles(): void {
    if (!this.viewModel.cornerPoleMeshes.Value) {
      this.viewModel.cornerPoleMeshes.Value = [];
      return;
    }
    const cornerPoleMeshesArray = this.viewModel.cornerPoleMeshes.Value;
    for (let i = 0; i < cornerPoleMeshesArray.length; i++) {
      cornerPoleMeshesArray[i].dispose();
    }
    this.viewModel.cornerPoleMeshes.Value = [];
  }

  public cleanupOldWalls(): void {
    if (!this.viewModel.wallMeshes.Value) {
      this.viewModel.wallMeshes.Value = [];
      return;
    }
    const wallMeshesArray = this.viewModel.wallMeshes.Value;
    for (let i = 0; i < wallMeshesArray.length; i++) {
      wallMeshesArray[i].dispose();
    }
    this.viewModel.wallMeshes.Value = [];
  }
  private createFloor(): void {
    const cornerCount = this.viewModel.spaceCornerPoints.Value.length;
    // Create Mesh
    // Initial Starting Point
    let polyPath = new Path2(
      this.viewModel.spaceCornerPoints.Value[0].x,
      this.viewModel.spaceCornerPoints.Value[0].y
    );
    // Remaining Points (Array Position 1 and onwards)
    for (let i = 1; i < cornerCount; i++) {
      const corner = Object.values(this.viewModel.spaceCornerPoints.Value[i]);
      polyPath.addLineTo(corner[0], corner[1]);
    }

    const polyMesh = new PolygonMeshBuilder(
      "FloorPolyMesh",
      this.viewModel.spaceCornerPoints.Value
    );

    this.viewModel.floorMesh.Value = polyMesh.build();
    this.scenePresenter.registerNavigationMesh(this.viewModel.floorMesh.Value);

    // Floor Material and Texture
    this.viewModel.floorMaterial.Value = new StandardMaterial(
      "floorMaterial",
      this.scenePresenter.Scene
    );

    this.viewModel.floorMaterial.Value.diffuseTexture = new Texture(
      floorTexture,
      this.scenePresenter.Scene
    );
    (this.viewModel.floorMaterial.Value.diffuseTexture as Texture).uScale = 2;
    (this.viewModel.floorMaterial.Value.diffuseTexture as Texture).vScale = 2;
    this.viewModel.floorMesh.Value.material =
      this.viewModel.floorMaterial.Value;
  }

  private createWalls(): void {
    const cornerCount = this.viewModel.spaceCornerPoints.Value.length;
    for (let i = 0; i < cornerCount; i++) {
      const corner = Object.values(this.viewModel.spaceCornerPoints.Value[i]);
      const nextCorner = Object.values(
        this.viewModel.spaceCornerPoints.Value[(i + 1) % cornerCount]
      );
      this.viewModel.wallMeshes.Value[i] = this.createWallSegment(
        corner,
        nextCorner
      );
    }
  }

  private createWallSegment(corner1: number[], corner2: number[]): Mesh {
    const WallLength = Math.sqrt(
      Math.pow(corner2[0] - corner1[0], 2) +
        Math.pow(corner2[1] - corner1[1], 2)
    );
    let wallSegmentOptions = {
      height: this.viewModel.spaceHeight.Value,
      width: WallLength,
      depth: this.viewModel.wallThickness.Value,
    };
    const wallSegment = MeshBuilder.CreateBox(
      "WallSegment",
      wallSegmentOptions,
      this.scenePresenter.Scene
    );

    wallSegment.position.x = (corner1[0] + corner2[0]) / 2;
    wallSegment.position.y = this.viewModel.baseHeight.Value || 0;
    wallSegment.position.z = (corner1[1] + corner2[1]) / 2;
    wallSegment.rotation.y = Math.atan2(
      corner2[1] - corner1[1],
      corner2[0] - corner1[0]
    );
    wallSegment.material = new StandardMaterial(
      "wallMaterial",
      this.scenePresenter.Scene
    );
    this.applyWallColor();
    return wallSegment;
  }

  private applyWallColor(): void {
    this.viewModel.wallMaterial.Value &&
      (this.viewModel.wallMaterial.Value.diffuseColor =
        this.viewModel.wallColor.Value);
  }

  private createWallCornerPoles(): void {
    const cornerCount = this.viewModel.spaceCornerPoints.Value.length;
    for (let i = 0; i < cornerCount; i++) {
      const corner = Object.values(this.viewModel.spaceCornerPoints.Value[i]);
      this.viewModel.cornerPoleMeshes.Value[i] = this.createPole(corner);
    }
  }

  private createPole(corner: number[]): Mesh {
    const poleOptions = {
      height: this.viewModel.spaceHeight.Value,
      diameter: this.viewModel.wallThickness.Value * 1.5,
    };
    const pole = MeshBuilder.CreateCylinder(
      "Pole",
      poleOptions,
      this.scenePresenter.Scene
    );
    pole.position.x = corner[0];
    pole.position.y = this.viewModel.baseHeight.Value || 0;
    pole.position.z = corner[1];

    pole.material = new StandardMaterial(
      "wallMaterial",
      this.scenePresenter.Scene
    );
    this.applyWallColor();
    return pole;
  }
}
