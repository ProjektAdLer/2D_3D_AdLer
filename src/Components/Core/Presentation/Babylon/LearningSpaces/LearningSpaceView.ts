// earcut is needed for triangulation used in the Babylon PolyMeshBuilder
// see also: https://doc.babylonjs.com/features/featuresDeepDive/mesh/creation/param/polyMeshBuilder
import earcut from "earcut";

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
    private controller: ILearningSpaceController,
  ) {
    let scenePresenterFactory = CoreDIContainer.get<ScenePresenterFactory>(
      SCENE_TYPES.ScenePresenterFactory,
    );
    this.scenePresenter = scenePresenterFactory(LearningSpaceSceneDefinition);
  }

  public async asyncSetup(): Promise<void> {
    // Errorhandling: Check if cornerCount is higher than 2
    if (this.viewModel.spaceCornerPoints.length < 3)
      throw new Error(
        "Not enough corners found to generate space. Please review the Spacedata.",
      );

    // If a theme has a wall texture, create walls
    if (
      LearningSpaceThemeLookup.getLearningSpaceTheme(this.viewModel.theme)
        .floorTexture
    ) {
      this.createFloorMaterial();
      this.createWallMaterial();
      await Promise.all([this.createWalls(), this.createFloor()]);
    }
    // If a theme has no wall texture, only create floor
    else {
      this.createFloorMaterial();
      this.createNavMeshMaterial();
      this.createBigNavigationMesh();
      await this.createFloor();
    }
  }

  public createFloorMaterial(): void {
    this.viewModel.floorMaterial = new StandardMaterial(
      "floorMaterial",
      this.scenePresenter.Scene,
    );

    const floorTexture = LearningSpaceThemeLookup.getLearningSpaceTheme(
      this.viewModel.theme,
    ).floorTexture;

    if (floorTexture) {
      this.viewModel.floorMaterial.diffuseTexture = new Texture(
        floorTexture,
        this.scenePresenter.Scene,
      );

      (this.viewModel.floorMaterial.diffuseTexture as Texture).uScale = 3;
      (this.viewModel.floorMaterial.diffuseTexture as Texture).vScale = 3;
      this.viewModel.floorMaterial.specularColor = new Color3(0, 0, 0);
    } else {
      this.viewModel.floorMaterial.alpha = 0;
    }
  }

  public createWallMaterial(): void {
    this.viewModel.wallMaterial = new StandardMaterial(
      "wallMaterial",
      this.scenePresenter.Scene,
    );

    const wallTexture = LearningSpaceThemeLookup.getLearningSpaceTheme(
      this.viewModel.theme,
    ).wallTexture!;

    this.viewModel.wallMaterial.diffuseTexture = new Texture(
      wallTexture,
      this.scenePresenter.Scene,
    );

    (this.viewModel.wallMaterial.diffuseTexture as Texture).vScale = 1.5;
    (this.viewModel.wallMaterial.diffuseTexture as Texture).uScale = 6;
    this.viewModel.wallMaterial.specularColor = new Color3(0, 0, 0);
  }

  public createNavMeshMaterial(): void {
    this.viewModel.navMeshMaterial = new StandardMaterial(
      "navMeshMaterial",
      this.scenePresenter.Scene,
    );
    this.viewModel.navMeshMaterial.alpha = 0;
  }

  private async createFloor(): Promise<void> {
    // create floor mesh
    const polyMesh = new PolygonMeshBuilder(
      "FloorPolyMesh",
      this.viewModel.spaceCornerPoints
        .map((cornerPoint) => new Vector2(cornerPoint.x, cornerPoint.z))
        .reverse(),
    );
    this.viewModel.floorMesh = polyMesh.build(false, 0.5);
    this.scenePresenter.registerNavigationMesh(this.viewModel.floorMesh);

    // apply material
    this.viewModel.floorMesh.material = this.viewModel.floorMaterial;
  }

  private async createWalls(): Promise<void> {
    let wallMeshes: Mesh[] = this.createAllCornerPoles();
    wallMeshes = wallMeshes.concat(this.createAllWallSegments());

    let mergedWallMeshes = Mesh.MergeMeshes(wallMeshes, true) as Mesh;
    this.scenePresenter.Scene.removeMesh(mergedWallMeshes);

    this.scenePresenter.registerNavigationMesh(mergedWallMeshes);

    // apply cutouts
    if (this.viewModel.exitDoorPosition)
      mergedWallMeshes = this.createDoorCutout(
        this.viewModel.exitDoorPosition,
        mergedWallMeshes,
      );
    if (this.viewModel.entryDoorPosition)
      mergedWallMeshes = this.createDoorCutout(
        this.viewModel.entryDoorPosition,
        mergedWallMeshes,
      );
    for (const windowPosition of this.viewModel.windowPositions)
      mergedWallMeshes = this.createWindowCutout(
        windowPosition,
        mergedWallMeshes,
      );

    this.viewModel.wallMesh = mergedWallMeshes;
    this.scenePresenter.Scene.addMesh(mergedWallMeshes, true);

    // apply material
    mergedWallMeshes.material = this.viewModel.wallMaterial;
  }

  private createAllWallSegments(): Mesh[] {
    const wallSegments: Mesh[] = [];
    this.viewModel.wallSegmentLocations.forEach((wallSegmentLocation) => {
      wallSegments.push(
        this.createWallSegment(
          wallSegmentLocation.startPoint,
          wallSegmentLocation.endPoint,
          wallSegmentLocation.angle,
        ),
      );
    });

    return wallSegments;
  }

  private createWallSegment(
    startPoint: { x: number; z: number },
    endPoint: { x: number; z: number },
    angle: number,
  ): Mesh {
    const wallLength = Math.sqrt(
      Math.pow(endPoint.x - startPoint.x, 2) +
        Math.pow(endPoint.z - startPoint.z, 2),
    );
    const wallSegmentOptions = {
      height: this.viewModel.wallHeight + this.viewModel.wallGroundworkDepth,
      width: wallLength,
      depth: this.viewModel.wallThickness,
    };
    let wallSegment = MeshBuilder.CreateBox(
      "BaseWallSegment",
      wallSegmentOptions,
      this.scenePresenter.Scene,
    );
    this.scenePresenter.Scene.removeMesh(wallSegment);

    // set position
    wallSegment.position.x = (startPoint.x + endPoint.x) / 2;
    wallSegment.position.y =
      (this.viewModel.baseHeight || 0) +
      (this.viewModel.wallHeight - this.viewModel.wallGroundworkDepth) / 2;
    wallSegment.position.z = (startPoint.z + endPoint.z) / 2;

    wallSegment.rotation.y = Math.PI - angle;

    return wallSegment;
  }
  private createDoorCutout(
    doorPosition: [Vector3, number],
    wallSegment: Mesh,
  ): Mesh {
    // done by creating a new mesh and subtracting it from the wall mesh
    const doorCutout = MeshBuilder.CreateBox(
      "DoorCutout",
      {
        height: this.viewModel.doorHeight + 0.2,
        width: this.viewModel.doorWidth,
        depth: this.viewModel.wallThickness * 3,
      },
      this.scenePresenter.Scene,
    );

    // door outline x, y, z needs to be adjusted, cause door origin is not centered
    // The Adjustments with doorWidth has to be discarded when door origin is fixed
    const doorPosInRadians = (doorPosition[1] * Math.PI) / 180;
    doorCutout.position = new Vector3(
      doorPosition[0].x +
        (Math.sin(doorPosInRadians) * 0.4 + Math.cos(doorPosInRadians) * 0.1) *
          this.viewModel.doorWidth,
      doorPosition[0].y + 0.5 * this.viewModel.doorHeight - 0.2,
      doorPosition[0].z +
        (Math.sin(doorPosInRadians) * 0.1 + Math.cos(doorPosInRadians) * 0.4) *
          this.viewModel.doorWidth,
    );
    doorCutout.rotation = new Vector3(
      0.0,
      Tools.ToRadians(doorPosition[1] + 90),
      0.0,
    );

    const doorCutoutCSG = CSG.FromMesh(doorCutout);
    const wallSegmentDraftCSG = CSG.FromMesh(wallSegment);
    const booleanCSG = wallSegmentDraftCSG.subtract(doorCutoutCSG);
    const wallSegmentWithCutout = booleanCSG.toMesh(
      "DoorCutoutWallSegment",
      null,
      this.scenePresenter.Scene,
    );

    this.scenePresenter.Scene.removeMesh(wallSegmentWithCutout, true);
    doorCutout.dispose();

    return wallSegmentWithCutout;
  }

  private createWindowCutout(
    windowPosition: [Vector3, number],
    wallSegment: Mesh,
  ): Mesh {
    //subtract window outline. Done by creating a new mesh and subtracting it from the wall mesh
    const windowCutout = MeshBuilder.CreateBox(
      "WindowOutline",
      {
        height: this.viewModel.windowHeight,
        width: this.viewModel.windowWidth,
        depth: this.viewModel.wallThickness * 1.5,
      },
      this.scenePresenter.Scene,
    );
    // window outline
    windowCutout.position = new Vector3(
      windowPosition[0].x,
      windowPosition[0].y + this.viewModel.windowHeight - 0.1,
      windowPosition[0].z,
    );
    windowCutout.rotation = new Vector3(
      0.0,
      Tools.ToRadians(windowPosition[1]) + Math.PI / 2,
      0.0,
    );

    const windowCutoutCSG = CSG.FromMesh(windowCutout);
    const wallSegmentDraftCSG = CSG.FromMesh(wallSegment);
    const booleanCSG = wallSegmentDraftCSG.subtract(windowCutoutCSG);
    const wallSegmentWithCutout = booleanCSG.toMesh(
      "WindowCutoutWallSegment",
      null,
      this.scenePresenter.Scene,
    );

    this.scenePresenter.Scene.removeMesh(wallSegmentWithCutout, true);
    windowCutout.dispose();

    return wallSegmentWithCutout;
  }

  private createAllCornerPoles(): Mesh[] {
    const cornerPoles: Mesh[] = [];
    this.viewModel.cornerPoleLocations.forEach((cornerPoleLocation) => {
      cornerPoles.push(
        this.createCornerPole(
          cornerPoleLocation.position.x,
          cornerPoleLocation.position.z,
        ),
      );
    });
    return cornerPoles;
  }

  private createCornerPole(posX: number, posZ: number): Mesh {
    const poleOptions = {
      height: this.viewModel.wallHeight + this.viewModel.wallGroundworkDepth,
      diameter: this.viewModel.wallThickness * 1.5,
      tessellation: 12,
    };
    const pole = MeshBuilder.CreateCylinder(
      "Pole",
      poleOptions,
      this.scenePresenter.Scene,
    );
    pole.position.x = posX;
    pole.position.y =
      (this.viewModel.baseHeight || 0) +
      (this.viewModel.wallHeight - this.viewModel.wallGroundworkDepth) / 2;
    pole.position.z = posZ;

    return pole;
  }

  private async createBigNavigationMesh(): Promise<void> {
    const bigNavmesh = MeshBuilder.CreateGround(
      "BigNavMesh",
      {
        width: 18,
        height: 18,
      },
      this.scenePresenter.Scene,
    );
    bigNavmesh.material = this.viewModel.navMeshMaterial;
    this.scenePresenter.registerNavigationMesh(bigNavmesh);
  }
}
