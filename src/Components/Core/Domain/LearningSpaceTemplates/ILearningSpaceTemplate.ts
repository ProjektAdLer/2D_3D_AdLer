import { LearningSpaceTemplateType } from "../Types/LearningSpaceTemplateType";

export interface Point {
  x: number;
  y: number;
}

export interface Orientation {
  rotation: number;
}

export interface Transform {
  position: Point;
  orientation: Orientation;
}

export interface WallSegment {
  start: number;
  end: number;
}

export default interface ILearningSpaceTemplate {
  name: LearningSpaceTemplateType;
  cornerPoints: Point[];
  walls: WallSegment[];
  elementSlots: Transform[];
  entryDoor: Transform;
  exitDoor: Transform;
  windows: Transform[];
  playerSpawnPoint: Transform;
  introStoryElementIdlePoint: Transform;
  introCutsceneSpawnPoint: Transform;
  outroStoryElementIdlePoint: Transform;
}
