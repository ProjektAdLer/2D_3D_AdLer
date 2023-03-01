import { ComponentID } from "../Types/EntityTypes";
import ElementEntity from "./ElementEntity";

export default class SpaceEntity {
  public id: ComponentID;
  public name: string;
  public elements: ElementEntity[];
  public description: string;
  public goals: string;
  public requirements: ComponentID[];
  public requiredScore: number;
  public worldID: ComponentID;
}
