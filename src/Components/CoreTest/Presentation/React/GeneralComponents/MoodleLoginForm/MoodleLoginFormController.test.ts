import LogUserIntoMoodleUseCase from "../../../../../Core/Application/UseCases/LoginMoodle/LoginMoodleUseCase";
import LoginModalController from "../../../../../Core/Presentation/React/GeneralComponents/LoginModal/LoginModalController";

const executeAsyncMock = jest.spyOn(
  LogUserIntoMoodleUseCase.prototype,
  "executeAsync"
);

describe("LoginModalController", () => {
  let systemUnderTest: LoginModalController;

  beforeEach(() => {
    systemUnderTest = new LoginModalController();
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
