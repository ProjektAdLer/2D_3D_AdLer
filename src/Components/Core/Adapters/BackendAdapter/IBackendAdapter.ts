import { LearningComponentID } from "../../Domain/Types/EntityTypes";
import LearningWorldTO from "../../Application/DataTransportObjects/LearningWorldTO";
import UserCredentials from "./Types/UserCredentials";

export type tempApiInfo = {
  userToken: string;
  worldName: string;
};

export default interface IBackend {
  getLearningWorldData({
    userToken,
    worldName,
  }: tempApiInfo): Promise<Partial<LearningWorldTO>>;

  scoreLearningElement(learningElementId: LearningComponentID): Promise<void>;

  logInUser(userCredentials: UserCredentials): Promise<string>;
}
