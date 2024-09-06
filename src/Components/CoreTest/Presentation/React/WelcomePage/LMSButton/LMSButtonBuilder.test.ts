import { mock } from "jest-mock-extended";
import { config } from "../../../../../../config";
import LMSButtonBuilder from "../../../../../Core/Presentation/React/WelcomePage/LMSButton/LMSButtonBuilder";
import LMSButtonController from "../../../../../Core/Presentation/React/WelcomePage/LMSButton/LMSButtonController";

describe("LMSButtonBuilder", () => {
  let systemUnderTest: LMSButtonBuilder;

  beforeEach(() => {
    systemUnderTest = new LMSButtonBuilder();
  });

  test("buildController builds the controller", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildController();

    expect(systemUnderTest["controller"]).toBeDefined();
    expect(systemUnderTest["controller"]).toBeInstanceOf(LMSButtonController);
  });
  test("buildViewModel concludes the build step successfully and sets the given data in the viewModel", () => {
    mock(config).moodleURL = "TestURL";

    systemUnderTest.buildViewModel();

    expect(systemUnderTest["viewModel"]).toBeDefined();
    expect(systemUnderTest["viewModel"]!.LMSUrl).toEqual("TestURL");
  });
});
