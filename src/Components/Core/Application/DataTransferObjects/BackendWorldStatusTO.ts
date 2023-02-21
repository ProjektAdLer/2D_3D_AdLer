import { ComponentID } from "../../Domain/Types/EntityTypes";
export default class BackendWorldStatusTO {
  courseId: ComponentID;
  learningElements: {
    elementId: ComponentID;
    successss: boolean;
  }[];
}
