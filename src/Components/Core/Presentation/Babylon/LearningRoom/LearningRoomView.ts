import {
  Path2,
  VertexData,
  StandardMaterial,
  Texture,
  PolygonMeshBuilder,
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
      this.displayRoom();
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
    // TODO: create walls via roomCornerPoints ~ FK
    this.createFloorViaCorners();
    //creating floor via roomCornerPoints ~ FK
  }

  private createFloorViaCorners(): void {
    // Errorhandling: Check if cornerCount is higher than 2
    const cornerCount = this.viewModel.roomCornerPoints.Value.length;
    if (cornerCount < 3)
      throw new Error(
        "Not enough corners found to generate floor. Please review the Roomdata."
      );

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
}
