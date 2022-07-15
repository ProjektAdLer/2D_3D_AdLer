import MoodleLoginFormPresenter from "../../../../Core/Presentation/React/MoodleLoginForm/MoodleLoginFormPresenter";
import MoodleLoginFormViewModel from "../../../../Core/Presentation/React/MoodleLoginForm/MoodleLoginFormViewModel";

describe("MoodleLoginFormPresenter", () => {
  let systemUnderTest: MoodleLoginFormPresenter;

  beforeEach(() => {
    systemUnderTest = new MoodleLoginFormPresenter(
      new MoodleLoginFormViewModel()
    );
  });

  test.todo("add tests here");
});
