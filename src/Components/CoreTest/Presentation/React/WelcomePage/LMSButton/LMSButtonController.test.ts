import LMSButtonController from "../../../../../Core/Presentation/React/WelcomePage/LMSButton/LMSButtonController";
import LMSButtonViewModel from "../../../../../Core/Presentation/React/WelcomePage/LMSButton/LMSButtonViewModel";

const windowMock = jest.spyOn(window, "open");

describe("LMSButtonController", () => {
  let systemUnderTest: LMSButtonController;
  let vm: LMSButtonViewModel;

  beforeEach(() => {
    vm = new LMSButtonViewModel();
    systemUnderTest = new LMSButtonController(vm);
  });

  test("openLMSPage should work", () => {
    systemUnderTest.openLMSPage();
    expect(windowMock).toHaveBeenCalled();
  });
});
