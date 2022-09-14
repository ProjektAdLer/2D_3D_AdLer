import { LearningComponentID } from "../../Domain/Types/EntityTypes";
import LearningWorldTO from "../../Application/DataTransportObjects/LearningWorldTO";
import UserCredentials from "./Types/UserCredentials";
import CourseListTO from "../../Application/DataTransportObjects/CourseListTO";

export type tempApiInfo = {
  userToken: string;
  worldId: number;
};

export default interface IBackendAdapter {
  getLearningWorldData({
    userToken,
    worldId,
  }: tempApiInfo): Promise<Partial<LearningWorldTO>>;

  scoreLearningElement(learningElementId: LearningComponentID): Promise<void>;

  logInUser(userCredentials: UserCredentials): Promise<string>;
  getCoursesAvalibaleForUser(userToken: string): Promise<CourseListTO>;
}
