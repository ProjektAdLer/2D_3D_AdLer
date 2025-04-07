import { ComponentID } from "../../../Domain/Types/EntityTypes";
import { injectable } from "inversify";
import { Mesh, StandardMaterial, Vector3 } from "@babylonjs/core";
import { LearningSpaceTemplateType } from "src/Components/Core/Domain/Types/LearningSpaceTemplateType";
import { LearningSpaceThemeType } from "src/Components/Core/Domain/Types/LearningSpaceThemeTypes";

export type LearningSpaceWallSegmentLocationData = {
  index: number;
  startPoint: { x: number; z: number };
  endPoint: { x: number; z: number };
  angle: number;
};
export type LearningSpaceCornerPoleLocationData = {
  index: number;
  position: { x: number; z: number };
};
@injectable()
export default class LearningSpaceViewModel {
  public id: ComponentID;
  public learningSpaceTemplateType: LearningSpaceTemplateType;
  public theme: LearningSpaceThemeType;

  // space constants
  public readonly doorWidth = 0.95;
  public readonly doorHeight = 2.07;
  public readonly windowWidth = 1.4;
  public readonly windowHeight = 1.6;
  public readonly baseHeight = 0;
  public readonly wallHeight = 2.85;
  public readonly wallThickness = 0.3;
  public readonly wallGroundworkDepth = 0.5;
  public readonly standInDecoSpawnProbability = 0.3;

  // materials
  public floorMaterial: StandardMaterial;
  public wallMaterial: StandardMaterial;
  public navMeshMaterial: StandardMaterial;

  // meshes
  public floorMesh: Mesh;
  public wallMesh: Mesh;

  // space dimensions
  public elementPositions: [Vector3, number][];
  public spaceCornerPoints: Vector3[];
  public wallSegments: { start: number; end: number }[];
  public exitDoorPosition: [Vector3, number];
  public entryDoorPosition: [Vector3, number];
  public windowPositions: [Vector3, number][] = [];
  public wallSegmentLocations: LearningSpaceWallSegmentLocationData[] = [];
  public cornerPoleLocations: LearningSpaceCornerPoleLocationData[] = [];
}
