import { LearningComponentID } from "./../../Types/EnitityTypes";
import { APILearningRoomTO } from "./APILearningRoomTO";

import { APIWorldTo } from "./APIWorldTO";
import { APILearningElementTO } from "./APILearningElementTO";

export type tempApiInfo = {
  userToken: string;
  worldName: string;
};

export default interface IBackend {
  getWorld({ userToken, worldName }: tempApiInfo): Promise<Partial<APIWorldTo>>;

  getLearningRooms({
    userToken,
    worldName,
  }: tempApiInfo): Promise<Partial<APILearningRoomTO[]>>;

  getLearningElements({
    userToken,
    worldName,
  }: tempApiInfo): Promise<Partial<APILearningElementTO[]>>;
  scoreLearningElement(learningElementId: LearningComponentID): Promise<void>;
  logInUser(userCredentials: {
    username: string;
    password: string;
  }): Promise<string>;
}
