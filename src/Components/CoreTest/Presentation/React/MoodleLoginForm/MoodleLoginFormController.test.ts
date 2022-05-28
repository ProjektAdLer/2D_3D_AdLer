import LogUserIntoMoodleUseCase from "../../../../Core/Application/LogUserIntoMoodle/LogUserIntoMoodleUseCase";
import MoodleLoginFormController from "../../../../Core/Presentation/React/MoodleLoginForm/MoodleLoginFormController";

const executeAsyncMock = jest.spyOn(
  LogUserIntoMoodleUseCase.prototype,
  "executeAsync"
);

describe("MoodleLoginFormController", () => {
  let moodleLoginFormController: MoodleLoginFormController;

  beforeEach(() => {
    moodleLoginFormController = new MoodleLoginFormController();
  });

  test("loginAsync calls the use case", () => {
    moodleLoginFormController.loginAsync("username", "password");

    expect(executeAsyncMock).toHaveBeenCalledTimes(1);
    expect(executeAsyncMock).toHaveBeenCalledWith({
      username: "username",
      password: "password",
    });
  });
});
