import { ComponentID } from "../../Domain/Types/EntityTypes";
import { BooleanNode } from "../UseCases/CalculateLearningSpaceAvailability/Parser/BooleanSyntaxTree";
import LearningElementTO from "./LearningElementTO";

/**
 * Data Transfer Object for a Space
 * @class SpaceTO
 * @property {ElementID} id - The ID of the space
 * @property {string} name - The name of the space
 * @property {ElementTO[]} elements - The elements of the space
 * @property {string} description - The description of the space
 * @property {string} goals - The learning goals of the space
 * @property {ElementID[]} requirementsString - String that describes the requirements of the space
 * @property {BooleanNode} requirementsSyntaxTree - Syntax tree that describes the requirements of the space
 * @property {boolean} isAvailable - Whether the space is available for the user
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
  requirementsString: string;
  requirementsSyntaxTree: BooleanNode;
  isAvailable: boolean;
  requiredScore: number;
  currentScore: number;
  maxScore: number;
}
