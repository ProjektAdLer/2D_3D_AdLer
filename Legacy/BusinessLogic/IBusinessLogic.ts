import { H5PForCoursesAPIResponse } from "../../src/Components/Core/Types/H5PTypes";

export default interface BusinessLogic {
  setupMoodle(): Promise<void>;
  getAllH5Ps(courseId: number): Promise<H5PForCoursesAPIResponse>;
}
