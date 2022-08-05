import {
  Path2,
  VertexData,
  StandardMaterial,
  Texture,
  PolygonMeshBuilder,
  MeshBuilder,
  Vector3,
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

    // initial render
    this.displayRoom();
  }

  public displayRoom(): void {
    // Errorhandling: Check if cornerCount is higher than 2
    if (this.viewModel.roomCornerPoints.Value.length < 3)
      throw new Error(
        "Not enough corners found to generate room. Please review the Roomdata."
      );
    // TODO: create walls via roomCornerPoints ~ FK
    this.createWallViaCorners();
    this.createFloorViaCorners();
    //creating floor via roomCornerPoints ~ FK
  }

  private createFloorViaCorners(): void {
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
    if (!this.viewModel.floorMesh.Value) {
      this.viewModel.floorMesh.Value = polyMesh.build();
    }
    this.scenePresenter.registerNavigationMesh(this.viewModel.floorMesh.Value);

    // Floor Material and Texture
    if (!this.viewModel.floorMaterial.Value) {
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
  }

  private createWallViaCorners(): void {
    const cornerCount = this.viewModel.roomCornerPoints.Value.length;
    for (let i = 0; i < cornerCount; i++) {
      const corner = Object.values(this.viewModel.roomCornerPoints.Value[i]);
      const nextCorner = Object.values(
        this.viewModel.roomCornerPoints.Value[(i + 1) % cornerCount]
      );
      this.createWallSegment(corner, nextCorner);
    }
  }

  private createWallSegment(corner1: number[], corner2: number[]): void {
    //debug
    const points = [
      new Vector3(corner1[0], 0, corner1[1]),
      new Vector3(corner2[0], 0, corner2[1]),
    ];
    MeshBuilder.CreateLines(
      "debug Lines",
      { points: points },
      this.scenePresenter.Scene
    );
    console.log("corner2[0]", corner2[0]);
    //enddebug
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
      "Wallsegment",
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
  }

  private applyWallColor(): void {
    this.viewModel.wallMaterial.Value.diffuseColor =
      this.viewModel.wallColor.Value;
  }
}
