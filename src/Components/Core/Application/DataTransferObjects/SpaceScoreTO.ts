import { ElementID } from "../../Domain/Types/EntityTypes";

/**
 * Data Transfer Object for the Score data of a Space
 * @class SpaceScoreTO
 * @property {number} currentScore - The current score of the space
 * @property {number} requiredScore - The required score to complete this space
 * @property {number} maxScore - The maximum score of the space
 * @property {ElementID} spaceID - The ID of the space
 */
export default class SpaceScoreTO {
  currentScore: number;
  requiredScore: number;
  maxScore: number;
  spaceID: ElementID;
}
