import IMoodle from "../../../Core/BusinessLogic/Moodle/IMoodle";
import Moodle from "../../../Core/BusinessLogic/Moodle/Moodle";
import DataAccess from "../../../Core/DataAccess/API/DataAccess";
import CoreDIContainer from "../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../Core/DependencyInjection/types";
import MoodleData from "../../../Core/Entities/MoodleData";
import { H5PForCoursesAPIResponse } from "../../../Core/Types/H5PTypes";

const apiResponse: H5PForCoursesAPIResponse = {
  h5pactivities: [
    {
      id: 7,
      course: 5,
      name: "Metriken Teil 1",
      timecreated: 1643289976,
      timemodified: 1643289976,
      intro: "",
      introformat: 1,
      grade: 100,
      displayoptions: 15,
      enabletracking: 1,
      grademethod: 1,
      coursemodule: 135,
      context: 278,
      introfiles: [],
      package: [
        {
          filename: "Metriken Teil 1.h5p",
          filepath: "/",
          filesize: 6542020,
          fileurl:
            "https://moodle.cluuub.xyz/webservice/pluginfile.php/278/mod_h5pactivity/package/0/Metriken%20Teil%201.h5p",
          timemodified: 1643289976,
          mimetype: "application/zip.h5p",
          isexternalfile: false,
        },
      ],
      deployedfile: {
        filename: "interactive-video-10-10.h5p",
        filepath: "/",
        filesize: 6310661,
        fileurl:
          "https://moodle.cluuub.xyz/webservice/pluginfile.php/1/core_h5p/export/interactive-video-10-10.h5p",
        timemodified: 1644518766,
        mimetype: "application/zip.h5p",
      },
    },
    {
      id: 8,
      course: 5,
      name: "Metriken Teil 2",
      timecreated: 1643289979,
      timemodified: 1643289979,
      intro: "",
      introformat: 1,
      grade: 100,
      displayoptions: 15,
      enabletracking: 1,
      grademethod: 1,
      coursemodule: 136,
      context: 279,
      introfiles: [],
      package: [
        {
          filename: "Metriken Teil 2.h5p",
          filepath: "/",
          filesize: 7091653,
          fileurl:
            "https://moodle.cluuub.xyz/webservice/pluginfile.php/279/mod_h5pactivity/package/0/Metriken%20Teil%202.h5p",
          timemodified: 1643289979,
          mimetype: "application/zip.h5p",
          isexternalfile: false,
        },
      ],
      deployedfile: {
        filename: "interactive-video-12-12.h5p",
        filepath: "/",
        filesize: 6859424,
        fileurl:
          "https://moodle.cluuub.xyz/webservice/pluginfile.php/1/core_h5p/export/interactive-video-12-12.h5p",
        timemodified: 1644831788,
        mimetype: "application/zip.h5p",
      },
    },
  ],
  warnings: [],
};

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

  test("getAllH5p returns H5p Data when Token is present", async () => {
    moodleBs.moodleData = CoreDIContainer.get<MoodleData>(
      CORE_TYPES.MoodleData
    );
    moodleBs.moodleData.token = "testToken";

    jest
      .spyOn(DataAccess.prototype, "getAllH5pForCourse")
      .mockResolvedValue(apiResponse);

    expect(await moodleBs.getAllH5pForCourse(5)).toEqual(apiResponse);
  });
});
