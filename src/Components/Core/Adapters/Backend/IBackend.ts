import { LearningComponentID } from "./../../Types/EnitityTypes";
import { APILearningRoomTO } from "./APILearningRoomTO";

import { APIWorldTo } from "./APIWorldTO";
import { APILearningElementTO } from "./APILearningElementTO";

export default interface IBackend {
  getWorld(): Promise<Partial<APIWorldTo>>;

  getLearningRooms(): Promise<Partial<APILearningRoomTO[]>>;

  getLearningElements(): Promise<Partial<APILearningElementTO[]>>;
  scoreLearningElement(learningElementId: LearningComponentID): Promise<void>;
  logInUser(username: string, password: string): Promise<string>;
}
