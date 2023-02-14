import { ElementID } from "../../Domain/Types/EntityTypes";
export default class BackendWorldStatusTO {
  courseId: ElementID;
  learningElements: {
    elementId: ElementID;
    successss: boolean;
  }[];
}
