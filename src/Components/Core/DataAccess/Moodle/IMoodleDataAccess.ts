import { H5PForCoursesAPIResponse } from "../../Types/H5PTypes";

export default interface IMoodleDataAccess {
  makeApiCall<T>(
    siteUrl: string,
    requestData: Record<string, unknown>,
    token?: string,
    wsFunction?: string
  ): Promise<T>;

  signInUser(username: string, password: string): Promise<string>;

  getAllH5pForCourse(courseId: number): Promise<H5PForCoursesAPIResponse>;
}
