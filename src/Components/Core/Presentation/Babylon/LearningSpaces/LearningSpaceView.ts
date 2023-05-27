// earcut is needed for triangulation used in the Babylon PolyMeshBuilder
// see also: https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/param/polyMeshBuilder
import * as earcut from "earcut";

import {
  StandardMaterial,
  Texture,
  PolygonMeshBuilder,
  MeshBuilder,
  Mesh,
  Tools,
  Vector3,
  CSG,
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
      this.viewModel.spaceCornerPoints.Value.map(
        (cornerPoint) => new Vector2(cornerPoint.x, cornerPoint.z)
      )
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

  private createWallSegment(startPoint: Vector3, endPoint: Vector3): Mesh {
    // create mesh
    const wallLength = Math.sqrt(
      Math.pow(endPoint.x - startPoint.x, 2) +
        Math.pow(endPoint.z - startPoint.z, 2)
    );
    const wallSegmentOptions = {
      height:
        this.viewModel.wallHeight.Value +
        this.viewModel.wallGroundworkDepth.Value,
      width: wallLength,
      depth: this.viewModel.wallThickness.Value,
    };
    let wallSegmentDraft = MeshBuilder.CreateBox(
      "BaseWallSegment",
      wallSegmentOptions,
      this.scenePresenter.Scene
    );
    this.scenePresenter.Scene.removeMesh(wallSegmentDraft);
    this.scenePresenter.registerNavigationMesh(wallSegmentDraft);

    // set position
    wallSegmentDraft.position.x = (startPoint.x + endPoint.x) / 2;
    wallSegmentDraft.position.y =
      (this.viewModel.baseHeight.Value || 0) -
      this.viewModel.wallGroundworkDepth.Value +
      this.viewModel.wallHeight.Value / 2;
    wallSegmentDraft.position.z = (startPoint.z + endPoint.z) / 2;
    wallSegmentDraft.rotation.y = Math.atan2(
      endPoint.z - startPoint.z,
      endPoint.x - startPoint.x
    );

    // TODO: add calls for entrance and exit
    if (this.viewModel.doorPosition.Value)
      wallSegmentDraft = this.createDoorCutout(
        this.viewModel.doorPosition.Value,
        wallSegmentDraft
      );

    for (const windowPosition of this.viewModel.windowPositions.Value)
      wallSegmentDraft = this.createWindowCutout(
        windowPosition,
        wallSegmentDraft
      );

    this.scenePresenter.Scene.addMesh(wallSegmentDraft, true);

    // apply material
    wallSegmentDraft.material = this.viewModel.wallMaterial.Value;

    return wallSegmentDraft;
  }

  private createDoorCutout(
    doorPosition: [Vector3, number],
    wallSegment: Mesh
  ): Mesh {
    // done by creating a new mesh and subtracting it from the wall mesh
    const doorCutout = MeshBuilder.CreateBox(
      "DoorCutout",
      {
        height: this.viewModel.doorHeight.Value + 0.2,
        width: this.viewModel.doorWidth.Value,
        depth: this.viewModel.wallThickness.Value * 2,
      },
      this.scenePresenter.Scene
    );

    // door outline x, y, z needs to be adjusted, cause door origin is not centered
    doorCutout.position = new Vector3(
      doorPosition[0].x - 0.5 * this.viewModel.doorWidth.Value,
      doorPosition[0].y + 0.5 * this.viewModel.doorHeight.Value - 0.2,
      doorPosition[0].z
    );
    doorCutout.rotation = new Vector3(
      0.0,
      Tools.ToRadians(doorPosition[1] + 90),
      0.0
    );

    const doorCutoutCSG = CSG.FromMesh(doorCutout);
    const wallSegmentDraftCSG = CSG.FromMesh(wallSegment);
    const booleanCSG = wallSegmentDraftCSG.subtract(doorCutoutCSG);
    const wallSegmentWithCutout = booleanCSG.toMesh(
      "DoorCutoutWallSegment",
      null,
      this.scenePresenter.Scene
    );

    this.scenePresenter.Scene.removeMesh(wallSegmentWithCutout, true);
    doorCutout.dispose();

    return wallSegmentWithCutout;
  }

  private createWindowCutout(
    windowPosition: [Vector3, number],
    wallSegment: Mesh
  ): Mesh {
    //subtract window outline. Done by creating a new mesh and subtracting it from the wall mesh
    const windowCutout = MeshBuilder.CreateBox(
      "WindowOutline",
      {
        height: this.viewModel.windowHeight.Value,
        width: this.viewModel.windowWidth.Value,
        depth: this.viewModel.wallThickness.Value * 1.5,
      },
      this.scenePresenter.Scene
    );
    // window outline x, y, z needs to be adjusted, cause window origin is not centered
    windowCutout.position = new Vector3(
      windowPosition[0].x,
      windowPosition[0].y + this.viewModel.windowHeight.Value - 0.1,
      windowPosition[0].z
    );
    windowCutout.rotation = new Vector3(
      0.0,
      Tools.ToRadians(windowPosition[1]) + Math.PI / 2,
      0.0
    );

    const windowCutoutCSG = CSG.FromMesh(windowCutout);
    const wallSegmentDraftCSG = CSG.FromMesh(wallSegment);
    const booleanCSG = wallSegmentDraftCSG.subtract(windowCutoutCSG);
    const wallSegmentWithCutout = booleanCSG.toMesh(
      "WindowCutoutWallSegment",
      null,
      this.scenePresenter.Scene
    );

    this.scenePresenter.Scene.removeMesh(wallSegmentWithCutout, true);
    windowCutout.dispose();

    return wallSegmentWithCutout;
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

  private createPole(corner: Vector3): Mesh {
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
      this.viewModel.wallGroundworkDepth.Value +
      this.viewModel.wallHeight.Value / 2;
    pole.position.z = corner.z;

    // apply wall material
    pole.material = this.viewModel.wallMaterial.Value;

    return pole;
  }
}
