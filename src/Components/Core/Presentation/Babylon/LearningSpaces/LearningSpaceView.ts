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
import LearningSpaceViewModel from "./LearningSpaceViewModel";
import floorTexture from "../../../../../Assets/Texture_Floor_Parquet3.png";
import ILearningSpaceController from "./ILearningSpaceController";
import ILearningSpaceView from "./ILearningSpaceView";
import IScenePresenter from "../SceneManagement/IScenePresenter";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import SCENE_TYPES, {
  ScenePresenterFactory,
} from "~DependencyInjection/Scenes/SCENE_TYPES";
import LearningSpaceSceneDefinition from "../SceneManagement/Scenes/LearningSpaceSceneDefinition";
import bind from "bind-decorator";

// apply earcut (see also top of the page)
(window as any).earcut = earcut;

export default class LearningSpaceView implements ILearningSpaceView {
  private scenePresenter: IScenePresenter;

  constructor(
    private viewModel: LearningSpaceViewModel,
    private controller: ILearningSpaceController
  ) {
    let scenePresenterFactory = CoreDIContainer.get<ScenePresenterFactory>(
      SCENE_TYPES.ScenePresenterFactory
    );
    this.scenePresenter = scenePresenterFactory(LearningSpaceSceneDefinition);

    this.scenePresenter.Scene.onBeforeRenderObservable.add(
      this.displayLearningSpace
    );

    // create materials
    this.createFloorMaterial();
    this.createWallMaterial();
  }

  @bind
  public displayLearningSpace(): void {
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
    this.createCornerPoles();
    this.createFloor();
    this.applyWallColor();

    this.viewModel.isDirty = false;
  }

  private cleanupOldFloor(): void {
    if (!this.viewModel.floorMesh.Value) {
      return;
    }
    this.viewModel.floorMesh.Value.dispose();
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

  private cleanupOldWalls(): void {
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
      height:
        this.viewModel.wallHeight.Value +
        this.viewModel.wallGroundworkDepth.Value,
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
    console.log(this.viewModel.baseHeight.Value);
    wallSegment.position.x = (startPoint.x + endPoint.x) / 2;
    wallSegment.position.y =
      (this.viewModel.baseHeight.Value || 0) -
      this.viewModel.wallGroundworkDepth.Value;
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

  private createCornerPoles(): void {
    this.viewModel.spaceCornerPoints.Value.forEach((cornerPoint) => {
      this.viewModel.cornerPoleMeshes.Value.push(this.createPole(cornerPoint));
    });
  }

  private createPole(corner: Vector2): Mesh {
    // create pole mesh
    const poleOptions = {
      height:
        this.viewModel.wallHeight.Value +
        this.viewModel.wallGroundworkDepth.Value,
      diameter: this.viewModel.wallThickness.Value * 1.5,
    };
    const pole = MeshBuilder.CreateCylinder(
      "Pole",
      poleOptions,
      this.scenePresenter.Scene
    );

    // position pole
    pole.position.x = corner.x;
    pole.position.y =
      (this.viewModel.baseHeight.Value || 0) -
      this.viewModel.wallGroundworkDepth.Value;
    pole.position.z = corner.y;

    // apply wall material
    pole.material = this.viewModel.wallMaterial.Value;

    return pole;
  }
}
