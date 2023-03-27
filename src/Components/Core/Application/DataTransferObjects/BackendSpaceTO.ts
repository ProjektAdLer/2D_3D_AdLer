import { ComponentID } from "../../Domain/Types/EntityTypes";
import BackendElementTO from "./BackendElementTO";

/**
 * Data Transfer Object for a Space
 * @class SpaceTO
 * @property {ElementID} id - The ID of the space
 * @property {string} name - The name of the space
 * @property {ElementTO[]} elements - The elements of the space
 * @property {string} description - The description of the space
 * @property {string} goals - The learning goals of the space
 * @property {ElementID[]} requirements - The IDs of the spaces that have to be completed before this space can be unlocked
 * @property {number} requiredScore - The required score to complete this space
 * @property {number} currentScore - The current score of the space
 * @property {number} maxScore - The maximum score of the space
 */
export default class BackendSpaceTO {
  id: ComponentID;
  name: string;
  elements: BackendElementTO[];
  description: string;
  goals: string[];
  requirements: string;
  requiredScore: number;
}
