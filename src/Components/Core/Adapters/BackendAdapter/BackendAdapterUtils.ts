import BackendElementTO from "../../Application/DataTransferObjects/BackendElementTO";
import BackendSpaceTO from "../../Application/DataTransferObjects/BackendSpaceTO";
import BackendWorldTO from "../../Application/DataTransferObjects/BackendWorldTO";
import {
  LearningElementModelTypeEnums,
  isValidLearningElementModelType,
} from "../../Domain/Types/LearningElementModelTypes";
import { LearningElementTypes } from "../../Domain/Types/LearningElementTypes";
import { LearningSpaceTemplateType } from "../../Domain/Types/LearningSpaceTemplateType";
import IDSL, { APIElement, APISpace } from "./Types/IDSL";

/**
 * This class contains static utility functions for the BackendAdapters
 */
export default class BackendAdapterUtils {
  public static parseDSL(dsl: IDSL): BackendWorldTO {
    const elements: BackendElementTO[] = this.mapElements(dsl.world.elements);

    const spaces: BackendSpaceTO[] = this.mapSpaces(dsl.world.spaces, elements);

    const response: BackendWorldTO = {
      worldName: dsl.world.worldName,
      goals: dsl.world.worldGoals || [""],
      spaces: spaces,
      description: dsl.world.worldDescription,
    };

    return response;
  }

  // maps the spaces from the DSL to BackendSpaceTOs and connects them with their elements
  private static mapSpaces(
    spaces: APISpace[],
    elements: BackendElementTO[]
  ): BackendSpaceTO[] {
    return spaces.map((space) => {
      // compare template type to supported templates
      let template: string;
      if (
        !Object.values<string>(LearningSpaceTemplateType).includes(
          space.spaceTemplate.toUpperCase()
        )
      ) {
        template = LearningSpaceTemplateType.None;
      } else {
        template = space.spaceTemplate.toUpperCase();
      }

      return {
        id: space.spaceId,
        name: space.spaceName,
        elements: space.spaceSlotContents.map((elementId) => {
          if (elementId === null) return null;
          else return elements.find((element) => element.id === elementId);
        }),
        description: space.spaceDescription,
        goals: space.spaceGoals || [""],
        requirements: space.requiredSpacesToEnter,
        requiredScore: space.requiredPointsToComplete,
        template: template,
      } as BackendSpaceTO;
    });
  }

  // creates BackendElementTOs from the DSL if the element type is supported
  private static mapElements(elements: APIElement[]): BackendElementTO[] {
    return elements.flatMap((element) => {
      if (element.elementCategory in LearningElementTypes) {
        let model: string;
        if (isValidLearningElementModelType(element.elementModel)) {
          model = element.elementModel;
        } else {
          model = LearningElementModelTypeEnums.NoElementModelTypes.None;
        }

        return {
          id: element.elementId,
          description: element.elementDescription,
          goals: element.elementGoals || [""],
          name: element.elementName,
          type: element.elementCategory,
          value: element.elementMaxScore || 0,
          model: model,
        } as BackendElementTO;
      } else return [];
    });
  }
}
