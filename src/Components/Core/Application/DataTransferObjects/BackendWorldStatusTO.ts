import { ComponentID } from "../../Domain/Types/EntityTypes";
export default class BackendWorldStatusTO {
  courseID: ComponentID;
  learningElements: {
    elementID: ComponentID;
    successss: boolean;
  }[];
}
