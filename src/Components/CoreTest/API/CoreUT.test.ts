import Core from "../../Core/API/Core";
import ICore from "../../Core/API/ICore";
import CoreDIContainer from "../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../Core/DependencyInjection/CoreTypes";
import Presentation from "../../Core/Presentation/API/Presentation";

const setupBabylonMock = jest.spyOn(Presentation.prototype, "setupBabylon");
const setupReactMock = jest.spyOn(Presentation.prototype, "setupReact");

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

  test("setupReact calls the presentation layer API", () => {
    core.setupReact();
    expect(setupReactMock).toHaveBeenCalledTimes(1);
  });
});
