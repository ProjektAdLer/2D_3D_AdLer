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
import LearningSpaceThemeLookup from "src/Components/Core/Domain/LearningSpaceThemes/LearningSpaceThemeLookup";

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
  }

  public async asyncSetup(): Promise<void> {
    // Errorhandling: Check if cornerCount is higher than 2
    if (this.viewModel.spaceCornerPoints.length < 3)
      throw new Error(
        "Not enough corners found to generate space. Please review the Spacedata."
      );

    // create materials
    this.createFloorMaterial();
    this.createWallMaterial();

    // create walls and floor meshes
    await Promise.all([this.createWalls(), this.createFloor()]);
  }

  public createFloorMaterial(): void {
    this.viewModel.floorMaterial = new StandardMaterial(
      "floorMaterial",
      this.scenePresenter.Scene
    );

    this.viewModel.floorMaterial.diffuseTexture = new Texture(
      LearningSpaceThemeLookup.getLearningSpaceTheme(
        this.viewModel.theme
      ).floorTexture,
      this.scenePresenter.Scene
    );

    (this.viewModel.floorMaterial.diffuseTexture as Texture).uScale = 3;
    (this.viewModel.floorMaterial.diffuseTexture as Texture).vScale = 3;
    this.viewModel.floorMaterial.specularColor = new Color3(0, 0, 0);
  }

  public createWallMaterial(): void {
    this.viewModel.wallMaterial = new StandardMaterial(
      "wallMaterial",
      this.scenePresenter.Scene
    );
    this.viewModel.wallMaterial.diffuseTexture = new Texture(
      LearningSpaceThemeLookup.getLearningSpaceTheme(
        this.viewModel.theme
      ).wallTexture,
      this.scenePresenter.Scene
    );
    (this.viewModel.wallMaterial.diffuseTexture as Texture).vScale = 1.5;
    (this.viewModel.wallMaterial.diffuseTexture as Texture).uScale = 6;
    this.viewModel.wallMaterial.specularColor = new Color3(0, 0, 0);
  }

  private async createFloor(): Promise<void> {
    // create floor mesh
    const polyMesh = new PolygonMeshBuilder(
      "FloorPolyMesh",
      this.viewModel.spaceCornerPoints
        .map((cornerPoint) => new Vector2(cornerPoint.x, cornerPoint.z))
        .reverse()
    );
    this.viewModel.floorMesh = polyMesh.build(false, 0.5);
    this.scenePresenter.registerNavigationMesh(this.viewModel.floorMesh);

    // apply material
    this.viewModel.floorMesh.material = this.viewModel.floorMaterial;
  }

  private async createWalls(): Promise<void> {
    let wallMeshes: Mesh[] = this.createCornerPoles();
    wallMeshes = wallMeshes.concat(this.createWallSegments());

    let mergedWallMeshes = Mesh.MergeMeshes(wallMeshes, true) as Mesh;
    this.scenePresenter.Scene.removeMesh(mergedWallMeshes);

    this.scenePresenter.registerNavigationMesh(mergedWallMeshes);

    // apply cutouts
    if (this.viewModel.exitDoorPosition)
      mergedWallMeshes = this.createDoorCutout(
        this.viewModel.exitDoorPosition,
        mergedWallMeshes
      );
    if (this.viewModel.entryDoorPosition)
      mergedWallMeshes = this.createDoorCutout(
        this.viewModel.entryDoorPosition,
        mergedWallMeshes
      );
    for (const windowPosition of this.viewModel.windowPositions)
      mergedWallMeshes = this.createWindowCutout(
        windowPosition,
        mergedWallMeshes
      );

    this.viewModel.wallMesh = mergedWallMeshes;
    this.scenePresenter.Scene.addMesh(mergedWallMeshes, true);

    // apply material
    mergedWallMeshes.material = this.viewModel.wallMaterial;
  }

  private createWallSegments(): Mesh[] {
    const wallSegments: Mesh[] = [];
    this.viewModel.wallSegments.forEach((wallSegment) => {
      wallSegments.push(
        this.createWallSegment(
          this.viewModel.spaceCornerPoints[wallSegment.start],
          this.viewModel.spaceCornerPoints[wallSegment.end]
        )
      );
    });

    return wallSegments;
  }

  private createWallSegment(startPoint: Vector3, endPoint: Vector3): Mesh {
    // offset with wall thickness to create outside alligned walls
    const offsetStartPoint = new Vector3(
      startPoint.x +
        Math.sign(startPoint.x) * (this.viewModel.wallThickness / 2),
      startPoint.y,
      startPoint.z +
        Math.sign(startPoint.z) * (this.viewModel.wallThickness / 2)
    );
    const offsetEndPoint = new Vector3(
      endPoint.x + Math.sign(endPoint.x) * (this.viewModel.wallThickness / 2),
      endPoint.y,
      endPoint.z + Math.sign(endPoint.z) * (this.viewModel.wallThickness / 2)
    );

    // create mesh
    const wallLength =
      Math.sqrt(
        Math.pow(offsetEndPoint.x - offsetStartPoint.x, 2) +
          Math.pow(offsetEndPoint.z - offsetStartPoint.z, 2)
      ) + 0.01; // extend wall to avoid z-fighting at the edges
    const wallSegmentOptions = {
      height: this.viewModel.wallHeight + this.viewModel.wallGroundworkDepth,
      width: wallLength,
      depth: this.viewModel.wallThickness,
    };
    let wallSegment = MeshBuilder.CreateBox(
      "BaseWallSegment",
      wallSegmentOptions,
      this.scenePresenter.Scene
    );
    this.scenePresenter.Scene.removeMesh(wallSegment);

    // set position
    wallSegment.position.x = (offsetStartPoint.x + offsetEndPoint.x) / 2;
    wallSegment.position.y =
      (this.viewModel.baseHeight || 0) +
      (this.viewModel.wallHeight - this.viewModel.wallGroundworkDepth) / 2;
    wallSegment.position.z = (offsetStartPoint.z + offsetEndPoint.z) / 2;

    wallSegment.rotation.y =
      Math.PI -
      Math.atan2(
        offsetEndPoint.z - offsetStartPoint.z,
        offsetEndPoint.x - offsetStartPoint.x
      );

    return wallSegment;
  }

  private createDoorCutout(
    doorPosition: [Vector3, number],
    wallSegment: Mesh
  ): Mesh {
    // done by creating a new mesh and subtracting it from the wall mesh
    const doorCutout = MeshBuilder.CreateBox(
      "DoorCutout",
      {
        height: this.viewModel.doorHeight + 0.2,
        width: this.viewModel.doorWidth,
        depth: this.viewModel.wallThickness * 3,
      },
      this.scenePresenter.Scene
    );

    // door outline x, y, z needs to be adjusted, cause door origin is not centered
    // The Adjustments with doorWidth has to be discarded when door origin is fixed
    const radians = (doorPosition[1] * Math.PI) / 180;
    doorCutout.position = new Vector3(
      doorPosition[0].x +
        (Math.sin(radians) * 0.4 + Math.cos(radians) * 0.1) *
          this.viewModel.doorWidth,
      doorPosition[0].y + 0.5 * this.viewModel.doorHeight - 0.2,
      doorPosition[0].z +
        (Math.sin(radians) * 0.1 + Math.cos(radians) * 0.4) *
          this.viewModel.doorWidth
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
        height: this.viewModel.windowHeight,
        width: this.viewModel.windowWidth,
        depth: this.viewModel.wallThickness * 1.5,
      },
      this.scenePresenter.Scene
    );
    // window outline
    windowCutout.position = new Vector3(
      windowPosition[0].x,
      windowPosition[0].y + this.viewModel.windowHeight - 0.1,
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

  private createCornerPoles(): Mesh[] {
    let wallSegmentIntersections: Set<number> = new Set<number>();
    let visitedCornerPoints: Set<number> = new Set<number>();
    this.viewModel.wallSegments.forEach((wallSegment) => {
      if (visitedCornerPoints.has(wallSegment.start))
        wallSegmentIntersections.add(wallSegment.start);
      else visitedCornerPoints.add(wallSegment.start);

      if (visitedCornerPoints.has(wallSegment.end))
        wallSegmentIntersections.add(wallSegment.end);
      else visitedCornerPoints.add(wallSegment.end);
    });

    const cornerPoles: Mesh[] = [];
    wallSegmentIntersections.forEach((intersectionPoint) => {
      const poleMesh = this.createPole(
        this.viewModel.spaceCornerPoints[intersectionPoint]
      );
      cornerPoles.push(poleMesh);
    });

    return cornerPoles;
  }

  private createPole(corner: Vector3): Mesh {
    // offset with wall thickness to create outside alligned walls
    const offsetCorner = new Vector3(
      corner.x + Math.sign(corner.x) * (this.viewModel.wallThickness / 2),
      corner.y,
      corner.z + Math.sign(corner.z) * (this.viewModel.wallThickness / 2)
    );

    // create pole mesh
    const poleOptions = {
      height: this.viewModel.wallHeight + this.viewModel.wallGroundworkDepth,
      diameter: this.viewModel.wallThickness,
      tessellation: 12,
    };
    const pole = MeshBuilder.CreateCylinder(
      "Pole",
      poleOptions,
      this.scenePresenter.Scene
    );

    // position pole
    pole.position.x = offsetCorner.x;
    pole.position.y =
      (this.viewModel.baseHeight || 0) +
      (this.viewModel.wallHeight - this.viewModel.wallGroundworkDepth) / 2;
    pole.position.z = offsetCorner.z;

    return pole;
  }
}
