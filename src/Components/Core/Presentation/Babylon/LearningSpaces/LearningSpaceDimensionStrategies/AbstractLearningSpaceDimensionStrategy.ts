import { Vector3 } from "@babylonjs/core";
import LearningSpaceTO from "../../../../Application/DataTransferObjects/LearningSpaceTO";
import { WallSegment } from "src/Components/Core/Domain/LearningSpaceTemplates/ILearningSpaceTemplate";

export default abstract class LearningSpaceDimensionStrategy {
  constructor(
    protected wallThickness: number,
    protected baseHeight: number,
    protected doorWidth: number,
    protected windowWidth: number,
  ) {}

  abstract getCornerPoints(spaceTO: LearningSpaceTO): Vector3[];
  abstract getWallSegmentIndices(spaceTO: LearningSpaceTO): WallSegment[];
  abstract getLearningElementPositions(
    spaceTO: LearningSpaceTO,
  ): [Vector3, number][];
  abstract getEntryDoorPosition(spaceTO: LearningSpaceTO): [Vector3, number];
  abstract getExitDoorPosition(spaceTO: LearningSpaceTO): [Vector3, number];
  abstract getWindowPositions(spaceTO: LearningSpaceTO): [Vector3, number][];
}
