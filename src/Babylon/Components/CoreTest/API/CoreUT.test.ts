import Core from "../../Core/API/Core";
import ICore from "../../Core/API/ICore";
import BusinessLogic from "../../Core/BusinessLogic/API/BusinessLogic";
import CoreDIContainer from "../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../Core/DependencyInjection/types";
import Presentation from "../../Core/Presentation/API/Presentation";

const setupBabylonMock = jest.spyOn(Presentation.prototype, "setupBabylon");

const setupMoodleMock = jest.spyOn(BusinessLogic.prototype, "setupMoodle");

const mock = jest.spyOn(BusinessLogic.prototype, "getAllH5Ps");
describe("Core", () => {
  let core: ICore;
  beforeEach(() => {
    core = CoreDIContainer.get<Core>(CORE_TYPES.ICore);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test("setupBabylon calls the presentation layer API", () => {
    core.setupBabylon(document.createElement("canvas"));
    expect(setupBabylonMock).toHaveBeenCalledTimes(1);
  });

  test("setupMoodle calls the business layer API", () => {
    core.setupMoodle();
    expect(setupMoodleMock).toHaveBeenCalledTimes(1);
  });

  test("getAllH5Ps calls the Business Layern", () => {
    core.getAllH5Ps(5);
    expect(mock).toHaveBeenCalledTimes(1);
  });
});
