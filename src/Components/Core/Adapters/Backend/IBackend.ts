import { APILearningRoomTO } from "./APILearningRoomTO";

import { APIWorldTo } from "./APIWorldTO";
import { APILearningElementTO } from "./APILearningElementTO";

export interface IBackend {
  getWorld(): Promise<Partial<APIWorldTo>>;

  getLearningRooms(): Promise<Partial<APILearningRoomTO[]>>;

  getLearningElements(): Promise<Partial<APILearningElementTO[]>>;
}
