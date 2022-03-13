import Moodle from "../../../Core/BusinessLogic/Moodle/Moodle";
import CoreDIContainer from "../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../Core/DependencyInjection/CoreTypes";
import IBusinessLogic from "../../../Core/Presentation/API/IBusinessLogic";

const setupMoodleMock = jest.spyOn(Moodle.prototype, "setupMoodle");

describe("BusinessLogic", () => {
  let businessLogic: IBusinessLogic;
  beforeEach(() => {});

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test.todo("setupMooodle calls the buisiness layer API");
  // TODO: Fix this
  // businessLogic = CoreDIContainer.get<IBusinessLogic>(
  //   CORE_TYPES.IBusinessLogic
  // );
  // businessLogic.setupMoodle();
  // expect(setupMoodleMock).toHaveBeenCalledTimes(1);
});
