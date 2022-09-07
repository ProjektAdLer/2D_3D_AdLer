import { LearningComponentID } from "../../Domain/Types/EntityTypes";
import { APILearningRoomTO } from "./APILearningRoomTO";

import { APIWorldTo } from "./APIWorldTO";
import { APILearningElementTO } from "./APILearningElementTO";
import IDSL from "./IDSL";

export type tempApiInfo = {
  userToken: string;
  worldName: string;
};

export default interface IBackend {
  getLearningWorldData({
    userToken,
    worldName,
  }: tempApiInfo): Promise<Partial<APIWorldTo>>;

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
