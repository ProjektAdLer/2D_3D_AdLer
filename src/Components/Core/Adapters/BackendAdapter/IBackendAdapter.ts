import { ElementID } from "../../Domain/Types/EntityTypes";
import WorldTO from "../../Application/DataTransferObjects/WorldTO";
import UserCredentials from "./Types/UserCredentials";
import { XAPiEvent } from "../../Application/UseCases/ScoreH5PElement/IScoreH5PElement";
import CourseListTO from "../../Application/DataTransferObjects/CourseListTO";

// TODO: Restructure in meaningful types
export type getWorldDataParams = {
  userToken: string;
  worldId: number;
};

export type ScoreH5PElementRequest = {
  userToken: string;
  h5pId: number;
  courseId: number;
  rawH5PEvent: XAPiEvent;
};

export default interface IBackendAdapter {
  getWorldData({
    userToken,
    worldId,
  }: getWorldDataParams): Promise<Partial<WorldTO>>;

  scoreElement(elementId: ElementID): Promise<void>;

  scoreH5PElement(data: ScoreH5PElementRequest): Promise<void>;

  logInUser(userCredentials: UserCredentials): Promise<string>;
  getCoursesAvailableForUser(userToken: string): Promise<CourseListTO>;
  getH5PFileName(elementId: number, courseId: number): Promise<string>;
}
