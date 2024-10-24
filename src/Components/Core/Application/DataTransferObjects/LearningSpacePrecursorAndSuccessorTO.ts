import { ComponentID } from "../../Domain/Types/EntityTypes";
import LearningSpaceTO from "./LearningSpaceTO";

export default class LearningSpacePrecursorAndSuccessorTO {
  precursorSpaces: LearningSpaceTO[];
  successorSpaces: LearningSpaceTO[];
}
