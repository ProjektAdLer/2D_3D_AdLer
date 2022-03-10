import { mock } from "jest-mock-extended";
import IMoodle from "../../../Core/BusinessLogic/Moodle/IMoodle";
import Moodle from "../../../Core/BusinessLogic/Moodle/Moodle";
import DataAccess from "../../../Core/DataAccess/API/DataAccess";
import MoodleDataAccess from "../../../Core/DataAccess/Moodle/MoodleDataAccess";
import CoreDIContainer from "../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../Core/DependencyInjection/types";
import MoodleData from "../../../Core/Entities/MoodleData";
import { H5PForCoursesAPIResponse } from "../../../Core/Types/H5PTypes";

const apiResponse = mock<H5PForCoursesAPIResponse>();

describe("MoodleBS", () => {
  let moodleBs: IMoodle;

  beforeEach(() => {
    CoreDIContainer.snapshot();
    moodleBs = CoreDIContainer.get<Moodle>(CORE_TYPES.IMoodle);
  });

  afterEach(() => {
    CoreDIContainer.restore();
  });

  test("setupMoodle creates a User Token", async () => {
    jest.spyOn(DataAccess.prototype, "signInUser").mockResolvedValue("1234567");
    await moodleBs.setupMoodle();
    expect(moodleBs.moodleData.token).toBe("1234567");
  });

  test("getAllH5P throws an Error, if no Moodle Token is present", async () => {
    await expect(moodleBs.getAllH5pForCourse(5)).rejects.toThrow();
  });

  test("getAllH5p returns H5P Data when Token is present", async () => {
    moodleBs.moodleData = CoreDIContainer.get<MoodleData>(
      CORE_TYPES.MoodleData
    );
    moodleBs.moodleData.token = "testToken";

    console.log(apiResponse.h5pactivities);

    const mock = jest
      .spyOn(MoodleDataAccess.prototype, "makeApiCall")
      .mockResolvedValue(apiResponse);

    expect(await moodleBs.getAllH5pForCourse(5)).toEqual(apiResponse);
    expect(mock).toHaveBeenCalledTimes(1);
  });
});
