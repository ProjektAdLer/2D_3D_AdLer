import { ComponentID } from "../../Domain/Types/EntityTypes";

export default class WorldScoreTO {
  currentScore: number;
  requiredScore: number;
  maxScore: number;
  worldID: ComponentID;
}
