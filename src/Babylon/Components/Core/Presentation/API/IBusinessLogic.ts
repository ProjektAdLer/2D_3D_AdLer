import { ROOMSIZE } from "../../BusinessLogic/RoomConfigurator/RoomConfigurator";
import { H5PForCoursesAPIResponse } from "../../Types/H5PTypes";

export default interface IBusinessLogic {
  get RoomSize(): ROOMSIZE;
  setupMooodle(): Promise<void>;
  getAllH5Ps(courseId: number): Promise<H5PForCoursesAPIResponse>;
}
