import { H5PForCoursesAPIResponse } from "../../Types/H5PTypes";

export default interface IBusinessLogic {
  setupMoodle(): Promise<void>;
  getAllH5Ps(courseId: number): Promise<H5PForCoursesAPIResponse>;
}
