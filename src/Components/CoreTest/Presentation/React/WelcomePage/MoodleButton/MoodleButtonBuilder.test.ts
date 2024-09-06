import MoodleButtonBuilder from "../../../../../Core/Presentation/React/WelcomePage/MoodleButton/MoodleButtonBuilder";
import MoodleButtonPresenter from "../../../../../Core/Presentation/React/WelcomePage/MoodleButton/MoodleButtonPresenter";

describe("MoodleButtonBuilder", () => {
  let systemUnderTest: MoodleButtonBuilder;

  beforeEach(() => {
    systemUnderTest = new MoodleButtonBuilder();
  });

  test("buildPresenter builds the presenter", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();

    expect(systemUnderTest["presenter"]).toBeDefined();
    expect(systemUnderTest["presenter"]).toBeInstanceOf(MoodleButtonPresenter);
  });
});
