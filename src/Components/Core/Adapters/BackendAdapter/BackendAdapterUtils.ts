import BackendElementTO from "../../Application/DataTransferObjects/BackendElementTO";
import BackendSpaceTO from "../../Application/DataTransferObjects/BackendSpaceTO";
import BackendWorldTO from "../../Application/DataTransferObjects/BackendWorldTO";
import { ElementTypes } from "../../Domain/Types/ElementTypes";
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
      goals: dsl.world.worldGoals[0] || "",
      spaces: spaces,
      description: dsl.world.worldDescription,
    };

    return response;
  }

  // maps the spaces from the DSL to SpaceTOs and connects them with their elements
  private static mapSpaces(
    spaces: APISpace[],
    elements: BackendElementTO[]
  ): BackendSpaceTO[] {
    return spaces.map((space) => {
      return {
        id: space.spaceId,
        name: space.spaceName,
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
  private static mapElements(elements: APIElement[]): BackendElementTO[] {
    return elements.flatMap((element) => {
      if (element.elementCategory in ElementTypes) {
        return {
          id: element.elementId,
          description: element.elementDescription,
          goals: element.elementGoals[0] || "",
          name: element.elementName,
          type: element.elementCategory,
          value: element.elementMaxScore || 0,
        } as BackendElementTO;
      } else return [];
    });
  }
}
