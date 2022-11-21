// earcut is needed for triangulation used in the Babylon PolyMeshBuilder
// see also: https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/param/polyMeshBuilder
import * as earcut from "earcut";

import {
  StandardMaterial,
  Texture,
  PolygonMeshBuilder,
  MeshBuilder,
  Mesh,
  Vector2,
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

// apply earcut (see also top of the page)
(window as any).earcut = earcut;

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

    this.scenePresenter.Scene.onBeforeRenderObservable.add(this.displaySpace);

    // create materials
    this.createFloorMaterial();
    this.createWallMaterial();
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
    this.applyWallColor();

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

    this.viewModel.cornerPoleMeshes.Value.forEach((poleMesh) => {
      poleMesh.dispose();
    });
    this.viewModel.cornerPoleMeshes.Value = [];
  }

  public cleanupOldWalls(): void {
    if (!this.viewModel.wallMeshes.Value) {
      this.viewModel.wallMeshes.Value = [];
      return;
    }

    this.viewModel.wallMeshes.Value.forEach((wallMesh) => {
      wallMesh.dispose();
    });
    this.viewModel.wallMeshes.Value = [];
  }

  private createFloorMaterial(): void {
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
  }

  private createFloor(): void {
    // create floor mesh
    const polyMesh = new PolygonMeshBuilder(
      "FloorPolyMesh",
      this.viewModel.spaceCornerPoints.Value
    );
    this.viewModel.floorMesh.Value = polyMesh.build();
    this.scenePresenter.registerNavigationMesh(this.viewModel.floorMesh.Value);

    // apply material
    this.viewModel.floorMesh.Value.material =
      this.viewModel.floorMaterial.Value;
  }

  private createWallMaterial(): void {
    this.viewModel.wallMaterial.Value = new StandardMaterial(
      "wallMaterial",
      this.scenePresenter.Scene
    );
    this.applyWallColor();
  }

  private createWalls(): void {
    const cornerCount = this.viewModel.spaceCornerPoints.Value.length;

    for (let i = 0; i < cornerCount; i++) {
      this.viewModel.wallMeshes.Value[i] = this.createWallSegment(
        this.viewModel.spaceCornerPoints.Value[i],
        this.viewModel.spaceCornerPoints.Value[(i + 1) % cornerCount]
      );
    }
  }

  private createWallSegment(startPoint: Vector2, endPoint: Vector2): Mesh {
    // create mesh
    const wallLength = Math.sqrt(
      Math.pow(endPoint.x - startPoint.x, 2) +
        Math.pow(endPoint.y - startPoint.y, 2)
    );
    const wallSegmentOptions = {
      height: this.viewModel.spaceHeight.Value,
      width: wallLength,
      depth: this.viewModel.wallThickness.Value,
    };
    const wallSegment = MeshBuilder.CreateBox(
      "WallSegment",
      wallSegmentOptions,
      this.scenePresenter.Scene
    );
    this.scenePresenter.registerNavigationMesh(wallSegment);

    // set position
    wallSegment.position.x = (startPoint.x + endPoint.x) / 2;
    wallSegment.position.y = this.viewModel.baseHeight.Value || 0;
    wallSegment.position.z = (startPoint.y + endPoint.y) / 2;
    wallSegment.rotation.y = Math.atan2(
      endPoint.y - startPoint.y,
      endPoint.x - startPoint.x
    );

    // apply material
    wallSegment.material = this.viewModel.wallMaterial.Value;

    return wallSegment;
  }

  private applyWallColor(): void {
    this.viewModel.wallMaterial.Value &&
      (this.viewModel.wallMaterial.Value.diffuseColor =
        this.viewModel.wallColor.Value);
  }

  private createWallCornerPoles(): void {
    this.viewModel.spaceCornerPoints.Value.forEach((cornerPoint) => {
      this.viewModel.cornerPoleMeshes.Value.push(this.createPole(cornerPoint));
    });
  }

  private createPole(corner: Vector2): Mesh {
    // create pole mesh
    const poleOptions = {
      height: this.viewModel.spaceHeight.Value,
      diameter: this.viewModel.wallThickness.Value * 1.5,
    };
    const pole = MeshBuilder.CreateCylinder(
      "Pole",
      poleOptions,
      this.scenePresenter.Scene
    );

    // position pole
    pole.position.x = corner.x;
    pole.position.y = this.viewModel.baseHeight.Value || 0;
    pole.position.z = corner.y;

    // apply wall material
    pole.material = new StandardMaterial(
      "wallMaterial",
      this.scenePresenter.Scene
    );

    return pole;
  }
}
