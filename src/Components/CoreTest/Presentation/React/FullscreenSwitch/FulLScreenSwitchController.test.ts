import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import FullscreenSwitchController from "../../../../Core/Presentation/React/FullscreenSwitch/FullscreenSwitchController";

describe("LearningElementsDropdownController", () => {
  let systemUnderTest: FullscreenSwitchController;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.unbindAll();
  });

  beforeEach(() => {
    systemUnderTest = new FullscreenSwitchController();
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("should set document to fullscreen in landscape, if not in", () => {
    document.documentElement.requestFullscreen = jest.fn();
    const lock = jest.fn();
    //@ts-ignore
    window.screen.orientation = { lock };
    systemUnderTest.toggleFullscreen();
    expect(document.documentElement.requestFullscreen).toHaveBeenCalled();
    expect(lock).toHaveBeenCalledWith("landscape");
  });

  test("should exit Fullscreeen and unlock Rotation, if in Fullscreen", () => {
    //@ts-ignore
    document.fullscreenElement = true;

    document.exitFullscreen = jest.fn();
    const unlock = jest.fn();
    //@ts-ignore
    window.screen.orientation = { unlock };
    systemUnderTest.toggleFullscreen();
    expect(document.exitFullscreen).toHaveBeenCalled();
    expect(unlock).toHaveBeenCalled();
  });
});
