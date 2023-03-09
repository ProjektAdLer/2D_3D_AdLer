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
    const elements: ElementTO[] = this.mapElements(dsl.world.elements);

    const spaces: BackendSpaceTO[] = this.mapSpaces(dsl.world.spaces, elements);

    const response: BackendWorldTO = {
      worldName: dsl.world.lmsElementIdentifier.value,
      worldGoal: dsl.world.worldGoals[0] || "",
      spaces: spaces,
      description: dsl.world.worldDescription,
      goals: dsl.world.worldGoals[0] || "",
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
        name: space.lmsElementIdentifier.value,
        elements: elements.filter((element) =>
          space.spaceContents.includes(element.id)
        ),
        description: space.spaceDescription,
        goals: space.spaceGoals[0] || "",
        requirements: [], // TODO: implement requirements,
        requiredScore: space.requiredPointsToComplete,
      } as BackendSpaceTO;
    });
  }

  // creates ElementTOs from the DSL if the element type is supported
  private static mapElements(elements: APIElement[]): ElementTO[] {
    return elements.flatMap((element) => {
      if (element.elementCategory in ElementTypes) {
        return {
          id: element.elementId,
          description: element.elementDescription,
          goals: element.elementGoals[0] || "",
          name: element.lmsElementIdentifier.value,
          type: element.elementCategory,
          value: element.elementMaxScore || 0,
          //parentSpaceID: element.learningSpaceParentId,
        } as ElementTO;
      } else return [];
    });
  }
}
