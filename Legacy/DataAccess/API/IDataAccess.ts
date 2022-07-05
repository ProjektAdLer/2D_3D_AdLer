import { H5PForCoursesAPIResponse } from "../../Types/H5PTypes";

export default interface IDataAccess {
  signInUser(username: string, password: string): Promise<string>;
  getAllH5pForCourse(courseId: number): Promise<H5PForCoursesAPIResponse>;
}
