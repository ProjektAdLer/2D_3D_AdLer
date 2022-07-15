import MoodlePort from "../../../Core/Ports/MoodlePort/MoodlePort";
import IMoodleLoginFormPresenter from "../../../Core/Presentation/React/MoodleLoginForm/IMoodleLoginFormPresenter";

describe("MoodlePort", () => {
  let systemUnderTest: MoodlePort;

  beforeEach(() => {
    systemUnderTest = new MoodlePort();
  });

  test("registerMoodleLoginPresenter registers the presenter if none are present", () => {
    expect(systemUnderTest["moodleLoginFormPresenter"]).not.toBeDefined();

    const presenter = {} as IMoodleLoginFormPresenter;
    systemUnderTest.registerMoodleLoginPresenter(presenter);

    expect(systemUnderTest["moodleLoginFormPresenter"]).toBe(presenter);
  });

  test("registerMoodleLoginPresenter throws an error if a presenter was already registered", () => {
    expect(systemUnderTest["moodleLoginFormPresenter"]).not.toBeDefined();

    const presenter = {} as IMoodleLoginFormPresenter;
    systemUnderTest.registerMoodleLoginPresenter(presenter);

    expect(() => {
      systemUnderTest.registerMoodleLoginPresenter(presenter);
    }).toThrowError("already registered");
  });
});
