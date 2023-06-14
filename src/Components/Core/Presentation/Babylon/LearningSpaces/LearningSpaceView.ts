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
  Color3,
} from "@babylonjs/core";
import LearningSpaceViewModel from "./LearningSpaceViewModel";
import ILearningSpaceController from "./ILearningSpaceController";
import ILearningSpaceView from "./ILearningSpaceView";
import IScenePresenter from "../SceneManagement/IScenePresenter";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import SCENE_TYPES, {
  ScenePresenterFactory,
} from "~DependencyInjection/Scenes/SCENE_TYPES";
import LearningSpaceSceneDefinition from "../SceneManagement/Scenes/LearningSpaceSceneDefinition";
import bind from "bind-decorator";
import { LearningSpaceTemplateType } from "src/Components/Core/Domain/Types/LearningSpaceTemplateType";

// apply earcut (see also top of the page)
(window as any).earcut = earcut;

const floorTextureLinks: { [key in LearningSpaceTemplateType]: string } = {
  [LearningSpaceTemplateType.L]: require("../../../../../Assets/textures/WoodFloor051_1K_Color.jpg"),
  [LearningSpaceTemplateType.R6]: require("../../../../../Assets/textures/WoodFloor054_1K_Color.jpg"),
  [LearningSpaceTemplateType.R8]: require("../../../../../Assets/textures/Tiles078_1K_Color.jpg"),
  [LearningSpaceTemplateType.None]: require("../../../../../Assets/textures/Tiles078_1K_Color.jpg"),
};
const wallTextureLinks: { [key in LearningSpaceTemplateType]: any } = {
  [LearningSpaceTemplateType.L]: require("../../../../../Assets/textures/Bricks050_1K_Color.jpg"),
  [LearningSpaceTemplateType.R6]: require("../../../../../Assets/textures/Plaster001_1K_Color.jpg"),
  [LearningSpaceTemplateType.R8]: require("../../../../../Assets/textures/Bricks058_1K_Color.jpg"),
  [LearningSpaceTemplateType.None]: require("../../../../../Assets/textures/Bricks050_1K_Color.jpg"),
};

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
    this.viewModel.learningSpaceTemplateType.subscribe(() => {
      this.createFloorMaterial();
      this.createWallMaterial();
    });
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

  public createFloorMaterial(): void {
    this.viewModel.floorMaterial.Value = new StandardMaterial(
      "floorMaterial",
      this.scenePresenter.Scene
    );

    this.viewModel.floorMaterial.Value.diffuseTexture = new Texture(
      floorTextureLinks[this.viewModel.learningSpaceTemplateType.Value],
      this.scenePresenter.Scene
    );

    (this.viewModel.floorMaterial.Value.diffuseTexture as Texture).uScale = 3;
    (this.viewModel.floorMaterial.Value.diffuseTexture as Texture).vScale = 3;
    this.viewModel.floorMaterial.Value.specularColor = new Color3(0, 0, 0);
  }

  public createWallMaterial(): void {
    this.viewModel.wallMaterial.Value = new StandardMaterial(
      "wallMaterial",
      this.scenePresenter.Scene
    );
    this.viewModel.wallMaterial.Value.diffuseTexture = new Texture(
      wallTextureLinks[this.viewModel.learningSpaceTemplateType.Value],
      this.scenePresenter.Scene
    );
    (this.viewModel.wallMaterial.Value.diffuseTexture as Texture).vScale = 1.5;
    (this.viewModel.wallMaterial.Value.diffuseTexture as Texture).uScale = 6;
    this.viewModel.wallMaterial.Value.specularColor = new Color3(0, 0, 0);
  }

  private createFloor(): void {
    // create floor mesh
    const polyMesh = new PolygonMeshBuilder(
      "FloorPolyMesh",
      this.viewModel.spaceCornerPoints.Value.map(
        (cornerPoint) => new Vector2(cornerPoint.x, cornerPoint.z)
      ).reverse()
    );
    this.viewModel.floorMesh.Value = polyMesh.build(false, 0.5);
    this.scenePresenter.registerNavigationMesh(this.viewModel.floorMesh.Value);

    // apply material
    this.viewModel.floorMesh.Value.material =
      this.viewModel.floorMaterial.Value;
  }

  private createWalls(): void {
    this.viewModel.wallSegments.Value.forEach((wallSegment) => {
      this.viewModel.wallMeshes.Value.push(
        this.createWallSegment(
          this.viewModel.spaceCornerPoints.Value[wallSegment.start],
          this.viewModel.spaceCornerPoints.Value[wallSegment.end]
        )
      );
    });
  }

  private createWallSegment(startPoint: Vector3, endPoint: Vector3): Mesh {
    // offset with wall thickness to create outside alligned walls
    const offsetStartPoint = new Vector3(
      startPoint.x +
        Math.sign(startPoint.x) * (this.viewModel.wallThickness.Value / 2),
      startPoint.y,
      startPoint.z +
        Math.sign(startPoint.z) * (this.viewModel.wallThickness.Value / 2)
    );
    const offsetEndPoint = new Vector3(
      endPoint.x +
        Math.sign(endPoint.x) * (this.viewModel.wallThickness.Value / 2),
      endPoint.y,
      endPoint.z +
        Math.sign(endPoint.z) * (this.viewModel.wallThickness.Value / 2)
    );

    // create mesh
    const wallLength =
      Math.sqrt(
        Math.pow(offsetEndPoint.x - offsetStartPoint.x, 2) +
          Math.pow(offsetEndPoint.z - offsetStartPoint.z, 2)
      ) + 0.01; // extend wall to avoid z-fighting at the edges
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
    wallSegmentDraft.position.x = (offsetStartPoint.x + offsetEndPoint.x) / 2;
    wallSegmentDraft.position.y =
      (this.viewModel.baseHeight.Value || 0) +
      (this.viewModel.wallHeight.Value -
        this.viewModel.wallGroundworkDepth.Value) /
        2;
    wallSegmentDraft.position.z = (offsetStartPoint.z + offsetEndPoint.z) / 2;

    wallSegmentDraft.rotation.y =
      Math.PI -
      Math.atan2(
        offsetEndPoint.z - offsetStartPoint.z,
        offsetEndPoint.x - offsetStartPoint.x
      );

    if (this.viewModel.exitDoorPosition.Value)
      wallSegmentDraft = this.createDoorCutout(
        this.viewModel.exitDoorPosition.Value,
        wallSegmentDraft
      );
    if (this.viewModel.entryDoorPosition.Value)
      wallSegmentDraft = this.createDoorCutout(
        this.viewModel.entryDoorPosition.Value,
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
        depth: this.viewModel.wallThickness.Value * 10,
      },
      this.scenePresenter.Scene
    );

    // door outline x, y, z needs to be adjusted, cause door origin is not centered
    // The Adjustments with doorWidth has to be discarded when door origin is fixed
    doorCutout.position = new Vector3(
      doorPosition[0].x - 0.5 * this.viewModel.doorWidth.Value,
      doorPosition[0].y + 0.5 * this.viewModel.doorHeight.Value - 0.2,
      doorPosition[0].z - 0.5 * this.viewModel.doorWidth.Value
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
    // window outline
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

  private createCornerPoles(): void {
    let wallSegmentIntersections: Set<number> = new Set<number>();
    let visitedCornerPoints: Set<number> = new Set<number>();
    this.viewModel.wallSegments.Value.forEach((wallSegment) => {
      if (visitedCornerPoints.has(wallSegment.start))
        wallSegmentIntersections.add(wallSegment.start);
      else visitedCornerPoints.add(wallSegment.start);

      if (visitedCornerPoints.has(wallSegment.end))
        wallSegmentIntersections.add(wallSegment.end);
      else visitedCornerPoints.add(wallSegment.end);
    });

    wallSegmentIntersections.forEach((intersectionPoint) => {
      const poleMesh = this.createPole(
        this.viewModel.spaceCornerPoints.Value[intersectionPoint]
      );
      this.viewModel.cornerPoleMeshes.Value.push(poleMesh);
    });
  }

  private createPole(corner: Vector3): Mesh {
    // offset with wall thickness to create outside alligned walls
    const offsetCorner = new Vector3(
      corner.x + Math.sign(corner.x) * (this.viewModel.wallThickness.Value / 2),
      corner.y,
      corner.z + Math.sign(corner.z) * (this.viewModel.wallThickness.Value / 2)
    );

    // create pole mesh
    const poleOptions = {
      height:
        this.viewModel.wallHeight.Value +
        this.viewModel.wallGroundworkDepth.Value,
      diameter: this.viewModel.wallThickness.Value,
    };
    const pole = MeshBuilder.CreateCylinder(
      "Pole",
      poleOptions,
      this.scenePresenter.Scene
    );

    // position pole
    pole.position.x = offsetCorner.x;
    pole.position.y =
      (this.viewModel.baseHeight.Value || 0) +
      (this.viewModel.wallHeight.Value -
        this.viewModel.wallGroundworkDepth.Value) /
        2;
    pole.position.z = offsetCorner.z;

    // apply wall material
    pole.material = this.viewModel.wallMaterial.Value;

    return pole;
  }
}
