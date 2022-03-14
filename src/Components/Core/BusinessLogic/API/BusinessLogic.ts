import IBusinessLogic from "../../Presentation/API/IBusinessLogic";
import IDataAccess from "./IDataAccess";
import { inject, injectable } from "inversify";
import CORE_TYPES from "../../DependencyInjection/CoreTypes";
import IRoomConfigurator from "../RoomConfigurator/IRoomConfigurator";
import { ROOMSIZE } from "../RoomConfigurator/RoomConfigurator";
import IMoodle from "../Moodle/IMoodle";
import { H5PForCoursesAPIResponse } from "../../Types/H5PTypes";

@injectable()
export default class BusinessLogic implements IBusinessLogic {
  private dataAccess: IDataAccess;
  private roomConfigurator: IRoomConfigurator;
  private moodleBS: IMoodle;

  constructor(
    @inject(CORE_TYPES.IDataAccess) dataAccess: IDataAccess,
    @inject(CORE_TYPES.IRoomConfigurator) roomConfigurator: IRoomConfigurator,
    @inject(CORE_TYPES.IMoodle) moodle: IMoodle
  ) {
    this.dataAccess = dataAccess;
    this.roomConfigurator = roomConfigurator;
    this.moodleBS = moodle;

    console.log("BusinessLogic");
  }

  async getAllH5Ps(courseId: number): Promise<H5PForCoursesAPIResponse> {
    return await this.moodleBS.getAllH5pForCourse(courseId);
  }

  get RoomSize(): ROOMSIZE {
    return this.roomConfigurator.RoomSize;
  }

  async setupMoodle(): Promise<void> {
    await this.moodleBS.setupMoodle();
  }
}
