import { ComponentID } from "../../Domain/Types/EntityTypes";
import LearningSpaceTO from "./LearningSpaceTO";

export default class LearningSpacePrecursorAndSuccessorTO {
  id: ComponentID;
  precursorSpaces: ComponentID[];
  successorSpaces: ComponentID[];
}
