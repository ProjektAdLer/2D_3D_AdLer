import MoodlePort from "../../../Core/Ports/MoodlePort/MoodlePort";
import IMoodleLoginFormPresenter from "../../../Core/Presentation/React/MoodleLoginForm/IMoodleLoginFormPresenter";

describe("MoodlePort", () => {
  let moodlePort: MoodlePort;

  beforeEach(() => {
    moodlePort = new MoodlePort();
  });

  test("registerMoodleLoginPresenter registers the presenter if non present", () => {
    expect(moodlePort["moodleLoginFormPresenter"]).not.toBeDefined();

    const presenter = {} as IMoodleLoginFormPresenter;
    moodlePort.registerMoodleLoginPresenter(presenter);

    expect(moodlePort["moodleLoginFormPresenter"]).toBe(presenter);
  });

  test("registerMoodleLoginPresenter throws an error if a presenter was already registered", () => {
    expect(moodlePort["moodleLoginFormPresenter"]).not.toBeDefined();

    const presenter = {} as IMoodleLoginFormPresenter;
    moodlePort.registerMoodleLoginPresenter(presenter);

    expect(() => {
      moodlePort.registerMoodleLoginPresenter(presenter);
    }).toThrowError("already registered");
  });
});
