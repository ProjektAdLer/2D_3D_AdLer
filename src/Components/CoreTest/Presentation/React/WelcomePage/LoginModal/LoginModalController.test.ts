import LoginUseCase from "../../../../../Core/Application/UseCases/Login/LoginUseCase";
import LoginModalController from "../../../../../Core/Presentation/React/WelcomePage/LoginModal/LoginModalController";

const executeAsyncMock = jest.spyOn(LoginUseCase.prototype, "executeAsync");

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
