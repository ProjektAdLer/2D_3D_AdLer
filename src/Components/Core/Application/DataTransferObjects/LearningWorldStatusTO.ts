import { ComponentID } from "../../Domain/Types/EntityTypes";
export default class LearningWorldStatusTO {
  worldID: ComponentID;
  elements: {
    elementID: ComponentID;
    hasScored: boolean;
  }[];
}
