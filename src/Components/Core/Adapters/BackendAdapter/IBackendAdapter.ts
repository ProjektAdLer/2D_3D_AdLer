import { ElementID } from "../../Domain/Types/EntityTypes";
import WorldTO from "../../Application/DataTransportObjects/WorldTO";
import UserCredentials from "./Types/UserCredentials";
import CourseListTO from "../../Application/DataTransportObjects/CourseListTO";

export type tempApiInfo = {
  userToken: string;
  worldId: number;
};

export default interface IBackendAdapter {
  getWorldData({ userToken, worldId }: tempApiInfo): Promise<Partial<WorldTO>>;

  scoreElement(elementId: ElementID): Promise<void>;

  logInUser(userCredentials: UserCredentials): Promise<string>;
  getCoursesAvailableForUser(userToken: string): Promise<CourseListTO>;
}
