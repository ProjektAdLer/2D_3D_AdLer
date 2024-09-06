import LMSButtonBuilder from "../../../../../Core/Presentation/React/WelcomePage/LMSButton/LMSButtonBuilder";
import LMSButtonPresenter from "../../../../../Core/Presentation/React/WelcomePage/LMSButton/LMSButtonPresenter";

describe("LMSButtonBuilder", () => {
  let systemUnderTest: LMSButtonBuilder;

  beforeEach(() => {
    systemUnderTest = new LMSButtonBuilder();
  });

  test("buildPresenter builds the presenter", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();

    expect(systemUnderTest["presenter"]).toBeDefined();
    expect(systemUnderTest["presenter"]).toBeInstanceOf(LMSButtonPresenter);
  });
});
