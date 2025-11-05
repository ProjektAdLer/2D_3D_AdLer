import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import LearningSpaceTO from "src/Components/Core/Application/DataTransferObjects/LearningSpaceTO";
import AbstractLearningSpaceDimensionStrategy from "./AbstractLearningSpaceDimensionStrategy";
import ILearningSpaceTemplate, {
  WallSegment,
} from "src/Components/Core/Domain/LearningSpaceTemplates/ILearningSpaceTemplate";
import { LearningSpaceTemplateType } from "src/Components/Core/Domain/Types/LearningSpaceTemplateType";
import LearningSpaceTemplateLookup from "src/Components/Core/Domain/LearningSpaceTemplates/LearningSpaceTemplatesLookup";

export default class TemplateLearningSpaceDimensionStrategy extends AbstractLearningSpaceDimensionStrategy {
  getCornerPoints(spaceTO: LearningSpaceTO): Vector3[] {
    const template = this.getTemplateByType(spaceTO.template);

    // TODO: add base height
    const cornerPointVectors = template.cornerPoints.map((point) => {
      return new Vector3(point.x, 0, point.y);
    });
    return cornerPointVectors;
  }

  getWallSegmentIndices(spaceTO: LearningSpaceTO): WallSegment[] {
    const template = this.getTemplateByType(spaceTO.template);
    return template.walls;
  }

  getLearningElementPositions(spaceTO: LearningSpaceTO): [Vector3, number][] {
    const template = this.getTemplateByType(spaceTO.template);

    const positions: [Vector3, number][] = [];
    for (let i = 0; i < template.elementSlots.length; i++) {
      const slot = template.elementSlots[i];
      positions.push([
        new Vector3(slot.position.x, this.baseHeight, slot.position.y),
        slot.orientation.rotation,
      ]);
    }
    return positions;
  }

  getEntryDoorPosition(spaceTO: LearningSpaceTO): [Vector3, number] {
    const template = this.getTemplateByType(spaceTO.template);

    const doorPosition = [
      new Vector3(
        template.entryDoor.position.x,
        this.baseHeight,
        template.entryDoor.position.y,
      ),
      template.entryDoor.orientation.rotation,
    ];
    return doorPosition as [Vector3, number];
  }

  getExitDoorPosition(spaceTO: LearningSpaceTO): [Vector3, number] {
    const template = this.getTemplateByType(spaceTO.template);

    const doorPosition = [
      new Vector3(
        template.exitDoor.position.x,
        this.baseHeight,
        template.exitDoor.position.y,
      ),
      template.exitDoor.orientation.rotation,
    ];
    return doorPosition as [Vector3, number];
  }

  getWindowPositions(spaceTO: LearningSpaceTO): [Vector3, number][] {
    const template = this.getTemplateByType(spaceTO.template);

    const positions = template.windows.map((window) => {
      return [
        new Vector3(window.position.x, this.baseHeight, window.position.y),
        window.orientation.rotation,
      ];
    });
    return positions as [Vector3, number][];
  }

  getLightPositions(spaceTO: LearningSpaceTO): [Vector3, number][] {
    const template = this.getTemplateByType(spaceTO.template);

    const positions = template.lights.map((light) => {
      return [
        new Vector3(light.position.x, this.baseHeight + 3, light.position.y),
        light.intensity,
      ];
    });
    return positions as [Vector3, number][];
  }

  private getTemplateByType(
    type: LearningSpaceTemplateType,
  ): ILearningSpaceTemplate {
    return LearningSpaceTemplateLookup.getLearningSpaceTemplate(type);
  }
}
