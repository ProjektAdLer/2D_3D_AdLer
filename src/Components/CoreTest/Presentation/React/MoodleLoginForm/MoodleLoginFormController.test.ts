import LogUserIntoMoodleUseCase from "../../../../Core/Application/LogUserIntoMoodle/LogUserIntoMoodleUseCase";
import MoodleLoginFormController from "../../../../Core/Presentation/React/MoodleLoginForm/MoodleLoginFormController";

const executeAsyncMock = jest.spyOn(
  LogUserIntoMoodleUseCase.prototype,
  "executeAsync"
);

describe("MoodleLoginFormController", () => {
  let systemUnderTest: MoodleLoginFormController;

  beforeEach(() => {
    systemUnderTest = new MoodleLoginFormController();
  });

  test("loginAsync calls the use case", () => {
    systemUnderTest.loginAsync("username", "password");

    expect(executeAsyncMock).toHaveBeenCalledTimes(1);
    expect(executeAsyncMock).toHaveBeenCalledWith({
      username: "username",
      password: "password",
    });
  });
});
