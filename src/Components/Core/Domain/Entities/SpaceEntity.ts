import { ElementID } from "../Types/EntityTypes";
import ElementEntity from "./ElementEntity";

export default class SpaceEntity {
  public id: ElementID;
  public name: string;
  public elements: ElementEntity[];
  public description: string;
  public goals: string;
  public requirements: ElementID[];
  public requiredScore: number;
}
