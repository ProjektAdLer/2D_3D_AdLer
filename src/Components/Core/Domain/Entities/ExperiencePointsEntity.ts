import { ComponentID } from "../Types/EntityTypes";

export default class ExperiencePointsEntity {
  worldID: ComponentID;
  maxLevel: number;
  currentLevel: number;
  maxExperiencePoints: number;
  currentExperiencePoints: number;
  baseExperiencePoints: number; // the points for an easy learningElement
}
