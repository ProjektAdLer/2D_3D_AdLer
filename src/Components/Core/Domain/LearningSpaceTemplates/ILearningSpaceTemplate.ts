import { LearningSpaceTemplateTypes } from "../Types/LearningSpaceTemplateTypes";

export interface Point {
  x: number;
  y: number;
}

export interface Orientation {
  /** in radians */
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
  name: LearningSpaceTemplateTypes;
  cornerPoints: Point[];
  walls: WallSegment[];
  elementSlots: Transform[];
  entranceDoor: Transform;
  exitDoor: Transform;
  windows: Transform[];
}
