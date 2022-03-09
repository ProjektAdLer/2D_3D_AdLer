import BusinessLogic from "../../../Core/BusinessLogic/API/BusinessLogic";
import Moodle from "../../../Core/BusinessLogic/Moodle/Moodle";
import CoreDIContainer from "../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../Core/DependencyInjection/types";
import IBusinessLogic from "../../../Core/Presentation/API/IBusinessLogic";

const setupMoodleMock = jest.spyOn(Moodle.prototype, "setupMoodle");

describe("BusinessLogic", () => {
  let businessLogic: IBusinessLogic;
  beforeEach(() => {
    businessLogic = CoreDIContainer.get<BusinessLogic>(
      CORE_TYPES.IBusinessLogic
    );
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test("setupMooodle calls the buisiness layer API", () => {
    businessLogic.setupMoodle();
    expect(setupMoodleMock).toHaveBeenCalledTimes(1);
  });
});
