import BackendSpaceTO from "../../Application/DataTransferObjects/BackendSpaceTO";
import BackendWorldTO from "../../Application/DataTransferObjects/BackendWorldTO";
import ElementTO from "../../Application/DataTransferObjects/ElementTO";
import { ElementTypes } from "../../Domain/Types/ElementTypes";
import IDSL, { APIElement, APISpace } from "./Types/IDSL";

/**
 * This class contains static utility functions for the BackendAdapters
 */
export default class BackendAdapterUtils {
  public static parseDSL(dsl: IDSL): BackendWorldTO {
    const elements: ElementTO[] = this.mapElements(
      dsl.learningWorld.learningElements
    );

    const spaces: BackendSpaceTO[] = this.mapSpaces(
      dsl.learningWorld.learningSpaces,
      elements
    );

    const response: BackendWorldTO = {
      worldName: dsl.learningWorld.identifier.value,
      worldGoal: dsl.learningWorld.goals,
      spaces: spaces,
      description: dsl.learningWorld.description,
      goals: dsl.learningWorld.goals,
    };

    return response;
  }

  // maps the spaces from the DSL to SpaceTOs and connects them with their elements
  private static mapSpaces(
    spaces: APISpace[],
    elements: ElementTO[]
  ): BackendSpaceTO[] {
    return spaces.map((space) => {
      return {
        id: space.spaceId,
        name: space.identifier.value,
        elements: elements.filter((element) =>
          space.learningSpaceContent.includes(element.id)
        ),
        description: space.description,
        goals: space.goals,
        requirements: space.requirements,
        requiredScore: space.requiredPoints,
      } as BackendSpaceTO;
    });
  }

  // creates ElementTOs from the DSL if the element type is supported
  private static mapElements(elements: APIElement[]): ElementTO[] {
    return elements.flatMap((element) => {
      if (element.elementCategory in ElementTypes) {
        return {
          id: element.id,
          description: element.description,
          goals: element.goals,
          name: element.identifier.value,
          type: element.elementCategory,
          value:
            Number.parseInt(element.learningElementValueList[0].value) || 0,
          parentSpaceId: element.learningSpaceParentId,
        } as ElementTO;
      } else return [];
    });
  }
}
