import {
  Path2,
  StandardMaterial,
  Texture,
  PolygonMeshBuilder,
  MeshBuilder,
  Mesh,
} from "@babylonjs/core";
import LearningRoomViewModel from "./LearningRoomViewModel";
import floorTexture from "../../../../../Assets/Texture_Floor_Parquet3.png";
import ILearningRoomController from "./ILearningRoomController";
import ILearningRoomView from "./ILearningRoomView";
import IScenePresenter from "../SceneManagement/IScenePresenter";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../DependencyInjection/CoreTypes";
import * as earcut from "earcut";
(window as any).earcut = earcut;

export default class LearningRoomView implements ILearningRoomView {
  private scenePresenter: IScenePresenter;

  constructor(
    private viewModel: LearningRoomViewModel,
    private controller: ILearningRoomController
  ) {
    this.scenePresenter = CoreDIContainer.get<IScenePresenter>(
      CORE_TYPES.IScenePresenter
    );
    if (!this.viewModel)
      throw new Error(
        "ViewModel is not set! Check if the builder is set up properly."
      );

    // setup callbacks for rerendering parts of the room when the view model changes
    this.viewModel.roomHeight.subscribe(() => {
      this.displayRoom();
    });
    this.viewModel.roomWidth.subscribe(() => {
      this.displayRoom();
    });
    this.viewModel.roomLength.subscribe(() => {
      this.displayRoom();
    });
    this.viewModel.wallThickness.subscribe(() => {
      this.displayRoom();
    });
    this.viewModel.baseHeight.subscribe(() => {
      this.displayRoom();
    });
    this.viewModel.wallColor.subscribe(() => {
      this.applyWallColor();
    });
    this.viewModel.doorHeight.subscribe(() => {
      this.displayRoom();
    });
    this.viewModel.doorWidth.subscribe(() => {
      this.displayRoom();
    });
    this.viewModel.roomCornerPoints.subscribe(() => {
      this.displayRoom();
    });

    // TODO: setup subscription cancellations
  }

  public displayRoom(): void {
    // Errorhandling: Check if cornerCount is higher than 2
    if (this.viewModel.roomCornerPoints.Value.length < 3)
      throw new Error(
        "Not enough corners found to generate room. Please review the Roomdata."
      );
    this.cleanupOldWalls();
    this.cleanupOldPoles();
    this.cleanupOldFloor();
    this.createWalls();
    this.createWallCornerPoles();
    this.createFloor();
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
    const cornerCount = this.viewModel.roomCornerPoints.Value.length;
    // Create Mesh
    // Initial Starting Point
    let polyPath = new Path2(
      this.viewModel.roomCornerPoints.Value[0].x,
      this.viewModel.roomCornerPoints.Value[0].y
    );
    // Remaining Points (Array Position 1 and onwards)
    for (let i = 1; i < cornerCount; i++) {
      const corner = Object.values(this.viewModel.roomCornerPoints.Value[i]);
      polyPath.addLineTo(corner[0], corner[1]);
    }

    const polyMesh = new PolygonMeshBuilder(
      "FloorPolyMesh",
      this.viewModel.roomCornerPoints.Value
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
    const cornerCount = this.viewModel.roomCornerPoints.Value.length;
    for (let i = 0; i < cornerCount; i++) {
      const corner = Object.values(this.viewModel.roomCornerPoints.Value[i]);
      const nextCorner = Object.values(
        this.viewModel.roomCornerPoints.Value[(i + 1) % cornerCount]
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
      height: this.viewModel.roomHeight.Value,
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
    const cornerCount = this.viewModel.roomCornerPoints.Value.length;
    for (let i = 0; i < cornerCount; i++) {
      const corner = Object.values(this.viewModel.roomCornerPoints.Value[i]);
      this.viewModel.cornerPoleMeshes.Value[i] = this.createPole(corner);
    }
  }

  private createPole(corner: number[]): Mesh {
    const poleOptions = {
      height: this.viewModel.roomHeight.Value,
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
