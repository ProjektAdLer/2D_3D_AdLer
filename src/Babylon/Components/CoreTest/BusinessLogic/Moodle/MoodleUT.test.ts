import IDataAccess from "../../../Core/BusinessLogic/API/IDataAccess";
import IMoodle from "../../../Core/BusinessLogic/Moodle/IMoodle";
import Moodle from "../../../Core/BusinessLogic/Moodle/Moodle";
import DataAccess from "../../../Core/DataAccess/API/DataAccess";
import CoreDIContainer from "../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../Core/DependencyInjection/types";

// jest.spyOn(DataAccess.prototype, "signInUser").mockResolvedValue("123456");

describe("MoodleBS", () => {
  let moodleBs: IMoodle;

  beforeEach(() => {
    moodleBs = CoreDIContainer.get<Moodle>(CORE_TYPES.IMoodle);
  });
  test("setupMoodle creates a User Token", async () => {
    jest.spyOn(DataAccess.prototype, "signInUser").mockResolvedValue("1234567");
    await moodleBs.setupMoodle();
    expect(moodleBs.moodleData.token).toBe("1234567");
  });
});
