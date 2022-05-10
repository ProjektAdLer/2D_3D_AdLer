import { injectable, inject } from "inversify";
import CORE_TYPES from "../../DependencyInjection/CoreTypes";
import { H5PForCoursesAPIResponse } from "../../Types/H5PTypes";
import IMoodleDataAccess from "../Moodle/IMoodleDataAccess";
import IDataAccess from "./IDataAccess";

@injectable()
export default class DataAccess implements IDataAccess {
  constructor(
    @inject(CORE_TYPES.IMoodleDataAccess) private moodleData: IMoodleDataAccess
  ) {}
  async signInUser(username: string, password: string): Promise<string> {
    return await this.moodleData.signInUser("Student", "wve2rxz7wfm3BPH-ykh");
  }

  async getAllH5pForCourse(
    courseId: number
  ): Promise<H5PForCoursesAPIResponse> {
    return await this.moodleData.getAllH5pForCourse(courseId);
  }
}
