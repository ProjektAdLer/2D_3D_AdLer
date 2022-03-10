import IMoodle from "../../../Core/BusinessLogic/Moodle/IMoodle";
import Moodle from "../../../Core/BusinessLogic/Moodle/Moodle";
import DataAccess from "../../../Core/DataAccess/API/DataAccess";
import CoreDIContainer from "../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../Core/DependencyInjection/types";

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
});
