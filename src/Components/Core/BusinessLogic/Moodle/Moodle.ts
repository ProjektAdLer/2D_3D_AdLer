import { inject, injectable } from "inversify";
import REACT_TYPES from "../../../React/DependencyInjection/ReactTypes";
import CoreDIContainer from "../../DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../DependencyInjection/CoreTypes";
import RootEntity from "../../Entities/Entities/RootEntity";
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
    const rootId = this.newEntityManager.getRootEntity().Value.id;
    const newId = this.newEntityManager.createEntity<TestEntity, RootEntity>(
      {
        member1: true,
        member2: "false",
      },
      rootId,
      "testEntity",
      TestEntity
    );
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
