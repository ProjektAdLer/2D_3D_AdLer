import { inject, injectable } from "inversify";
import REACT_TYPES from "../../../React/DependencyInjection/ReactTypes";
import CoreDIContainer from "../../DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../DependencyInjection/CoreTypes";
import MoodleData from "../../Entities/MoodleData";
import { H5PForCoursesAPIResponse } from "../../Types/H5PTypes";
import IDataAccess from "../API/IDataAccess";
import IEntityManager from "../EntityManager/IEntityManager";
import IMoodle from "./IMoodle";
const axios = require("axios").default;

@injectable()
export default class Moodle implements IMoodle {
  public moodleData: MoodleData;

  constructor(
    @inject(CORE_TYPES.IDataAccess) private dataAccess: IDataAccess,
    @inject(REACT_TYPES.IEntityManager) private entityManager: IEntityManager
  ) {}

  async setupMoodle(): Promise<void> {
    const userToken = await this.dataAccess.signInUser(
      "Student",
      "wve2rxz7wfm3BPH-ykh"
    );

    this.moodleData = CoreDIContainer.get<MoodleData>(CORE_TYPES.MoodleData);

    const callback = (data: any) => {
      console.log(data);
    };

    this.entityManager.test.subscribe(callback);

    this.entityManager.test.getData().value2.setValue("Das ist mein test");

    this.moodleData.token = userToken;
  }

  async getAllH5pForCourse(
    courseId: number
  ): Promise<H5PForCoursesAPIResponse> {
    await this.setupMoodle();
    if (!this.moodleData.token)
      throw new Error("No Moodle Token Present. Please call setupMoodle()");
    const resp = await this.dataAccess.getAllH5pForCourse(5);

    return resp;
  }
}
