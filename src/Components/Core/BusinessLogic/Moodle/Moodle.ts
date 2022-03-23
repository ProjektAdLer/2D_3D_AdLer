import { inject, injectable } from "inversify";
import REACT_TYPES from "../../../React/DependencyInjection/ReactTypes";
import CoreDIContainer from "../../DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../DependencyInjection/CoreTypes";
import TestEntity from "../../Entities/Entities/TestEntity";
import MoodleData from "../../Entities/MoodleData";
import { H5PForCoursesAPIResponse } from "../../Types/H5PTypes";
import IDataAccess from "../API/IDataAccess";
import IEntityManager from "../EntityManager/IEntityManager";
import INewEntityManager from "../EntityManager/NewEntityManager/INewEntityManager";
import IMoodle from "./IMoodle";
const axios = require("axios").default;

@injectable()
export default class Moodle implements IMoodle {
  public moodleData: MoodleData;

  constructor(
    @inject(CORE_TYPES.IDataAccess) private dataAccess: IDataAccess,
    @inject(REACT_TYPES.IEntityManager) private entityManager: IEntityManager,
    @inject(CORE_TYPES.INewEntityManager)
    private newEntityManager: INewEntityManager
  ) {}

  async setupMoodle(): Promise<void> {
    const entityID = this.newEntityManager.createEntity<TestEntity>(
      {
        member1: true,
        member2: "Das ist ein Test aus der Moodle BS heraus",
      },
      TestEntity
    );

    const entity = this.newEntityManager.getEntityById<TestEntity>(entityID);
    console.log(entity.Value.member1);
    const userToken = await this.dataAccess.signInUser(
      "Student",
      "wve2rxz7wfm3BPH-ykh"
    );

    this.moodleData = CoreDIContainer.get<MoodleData>(CORE_TYPES.MoodleData);

    this.moodleData.token = userToken;
  }

  async getAllH5pForCourse(
    courseId: number
  ): Promise<H5PForCoursesAPIResponse> {
    await this.setupMoodle();
    if (!this.moodleData.token)
      throw new Error("No Moodle Token Present. Please call setupMoodle()");
    return this.dataAccess.getAllH5pForCourse(5);
  }
}
