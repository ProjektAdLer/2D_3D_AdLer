import { ComponentID } from "../../Domain/Types/EntityTypes";
import LearningElementTO from "./LearningElementTO";

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
 * @property {WorldID} parentWorldID - The ID of the world this space belongs to
 */
export default class LearningSpaceTO {
  id: ComponentID;
  name: string;
  elements: LearningElementTO[];
  description: string;
  goals: string[];
  requirements: string;
  requiredScore: number;
  currentScore: number;
  maxScore: number;
}