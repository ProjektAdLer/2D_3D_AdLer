import { ComponentID } from "../../Domain/Types/EntityTypes";

export default class LearningWorldScoreTO {
  currentScore: number;
  requiredScore: number;
  maxScore: number;
  worldID: ComponentID;
}
