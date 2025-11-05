import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import LearningSpaceTO from "src/Components/Core/Application/DataTransferObjects/LearningSpaceTO";
import AbstractLearningSpaceDimensionStrategy from "./AbstractLearningSpaceDimensionStrategy";
import { WallSegment } from "src/Components/Core/Domain/LearningSpaceTemplates/ILearningSpaceTemplate";

export default class GenericLearningSpaceDimensionStrategy extends AbstractLearningSpaceDimensionStrategy {
  getCornerPoints(spaceTO: LearningSpaceTO): Vector3[] {
    const { spaceLength, spaceWidth } = this.calculateLengthWidth(spaceTO);

    // TODO: add base height
    return [
      new Vector3(
        spaceWidth + this.wallThickness,
        0,
        spaceLength + this.wallThickness,
      ),
      new Vector3(
        -spaceWidth - this.wallThickness,
        0,
        spaceLength + this.wallThickness,
      ),
      new Vector3(
        -spaceWidth - this.wallThickness,
        0,
        -spaceLength - this.wallThickness,
      ),
      new Vector3(
        spaceWidth + this.wallThickness,
        0,
        -spaceLength - this.wallThickness,
      ),
    ];
  }

  getWallSegmentIndices(): WallSegment[] {
    return [
      {
        start: 0,
        end: 1,
      },
      {
        start: 1,
        end: 2,
      },
      {
        start: 2,
        end: 3,
      },
      {
        start: 3,
        end: 0,
      },
    ];
  }

  getLearningElementPositions(spaceTO: LearningSpaceTO): [Vector3, number][] {
    const { spaceLength, spaceWidth } = this.calculateLengthWidth(spaceTO);

    let positions: [Vector3, number][] = [];
    let sideAlternation = -1;
    const sideOffset = 1;
    const elementCount = spaceTO.elements.length;

    for (let i = 0; i < elementCount; i++) {
      positions.push([
        new Vector3(
          spaceWidth * sideOffset * sideAlternation,
          this.baseHeight,
          (spaceLength / (elementCount + 1)) * (i + 1) - spaceLength / 2,
        ),
        sideAlternation >= 0 ? 0 : 180,
      ]);
      sideAlternation *= -1;
    }

    return positions;
  }

  getEntryDoorPosition(spaceTO: LearningSpaceTO): [Vector3, number] {
    const { spaceLength } = this.calculateLengthWidth(spaceTO);

    const doorPosition = [
      new Vector3(
        this.doorWidth / 2,
        this.baseHeight,
        -spaceLength - this.wallThickness,
      ),
      -90,
    ];
    return doorPosition as [Vector3, number];
  }

  getExitDoorPosition(spaceTO: LearningSpaceTO): [Vector3, number] {
    const { spaceLength } = this.calculateLengthWidth(spaceTO);
    const doorPosition = [
      new Vector3(
        this.doorWidth / 2,
        this.baseHeight,
        spaceLength + this.wallThickness,
      ),
      -90,
    ];
    return doorPosition as [Vector3, number];
  }

  getWindowPositions(spaceTO: LearningSpaceTO): [Vector3, number][] {
    const { spaceLength } = this.calculateLengthWidth(spaceTO);

    const windowPosition = [
      new Vector3(
        this.windowWidth + 3,
        this.baseHeight,
        -spaceLength - this.wallThickness,
      ),
      -90,
    ];
    return [windowPosition as [Vector3, number]];
  }

  getLightPositions(spaceTO: LearningSpaceTO): [Vector3, number][] {
    return [];
  }

  private calculateLengthWidth(spaceTO: LearningSpaceTO): {
    spaceLength: number;
    spaceWidth: number;
  } {
    const calculatedLength = (spaceTO.elements.length / 2) * 4;
    const calculatedWidth = spaceTO.elements.length > 1 ? 8 : 6;
    return { spaceWidth: calculatedWidth, spaceLength: calculatedLength };
  }
}
