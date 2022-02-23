import Core from "../../Core/API/Core";
import CoreDIContainer from "../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../Core/DependencyInjection/types";
import Presentation from "../../Core/Presentation/API/Presentation";

const setupBabylonMock = jest
  .spyOn(Presentation.prototype, "setupBabylon")
  .mockImplementation((canvas: HTMLCanvasElement): Promise<void> => {
    console.log("mock called");
    return new Promise<void>(() => {});
  });

describe("Core", () => {
  test("setupBabylon calls the presentation layer API", () => {
    const core = CoreDIContainer.get<Core>(CORE_TYPES.ICore);
    core.setupBabylon(document.createElement("canvas"));
    expect(setupBabylonMock).toHaveBeenCalledTimes(1);
  });
});
