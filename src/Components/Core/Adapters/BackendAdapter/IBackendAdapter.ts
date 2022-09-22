import { ElementID } from "../../Domain/Types/EntityTypes";
import WorldTO from "../../Application/DataTransferObjects/WorldTO";
import UserCredentials from "./Types/UserCredentials";
import CourseListTO from "../../Application/DataTransferObjects/CourseListTO";

// TODO: Restructure in meaningful types
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
