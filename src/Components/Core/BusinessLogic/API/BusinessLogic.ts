import IBusinessLogic from "../../Presentation/API/IBusinessLogic";
import IDataAccess from "./IDataAccess";
import { inject, injectable } from "inversify";
import CORE_TYPES from "../../DependencyInjection/CoreTypes";
import IMoodle from "../Moodle/IMoodle";
import { H5PForCoursesAPIResponse } from "../../Types/H5PTypes";

@injectable()
export default class BusinessLogic implements IBusinessLogic {
  private dataAccess: IDataAccess;
  private moodleBS: IMoodle;

  constructor(
    @inject(CORE_TYPES.IDataAccess) dataAccess: IDataAccess,
    @inject(CORE_TYPES.IMoodle) moodle: IMoodle
  ) {
    this.dataAccess = dataAccess;
    this.moodleBS = moodle;
  }

  async getAllH5Ps(courseId: number): Promise<H5PForCoursesAPIResponse> {
    return await this.moodleBS.getAllH5pForCourse(courseId);
  }

  async setupMoodle(): Promise<void> {
    return await this.moodleBS.setupMoodle();
  }
}
