import { ElementID } from "../../Domain/Types/EntityTypes";
import WorldTO from "../../Application/DataTransferObjects/WorldTO";
import UserCredentials from "./Types/UserCredentials";
import CourseListTO from "../../Application/DataTransportObjects/CourseListTO";
import { XAPiEvent } from "../../Application/UseCases/ScoreH5PElement/IScoreH5PElement";

// TODO: Restructure in meaningful types
export type tempApiInfo = {
  userToken: string;
  worldId: number;
};

export type ScoreH5PElementRequest = {
  userToken: string;
  h5pId: number;
  rawH5PEvent: XAPiEvent;
};

export default interface IBackendAdapter {
  getWorldData({ userToken, worldId }: tempApiInfo): Promise<Partial<WorldTO>>;

  scoreElement(elementId: ElementID): Promise<void>;

  scoreH5PElement(data: ScoreH5PElementRequest): Promise<void>;

  logInUser(userCredentials: UserCredentials): Promise<string>;
  getCoursesAvailableForUser(userToken: string): Promise<CourseListTO>;
}
