import { ElementID } from "./../../Domain/Types/EntityTypes";
export default class WorldStatusTO {
  courseId: ElementID;
  learningElements: {
    elementId: ElementID;
    successss: boolean;
  }[];
}
