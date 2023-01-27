import LoginUseCase from "../../../../../Core/Application/UseCases/Login/LoginUseCase";
import LoginButtonController from "../../../../../Core/Presentation/React/WelcomePage/LoginButton/LoginButtonController";
import LoginButtonViewModel from "../../../../../Core/Presentation/React/WelcomePage/LoginButton/LoginButtonViewModel";

const executeAsyncMock = jest.spyOn(LoginUseCase.prototype, "executeAsync");

describe("ElementDropdownController", () => {
  let systemUnderTest: LoginButtonController;

  beforeEach(() => {
    systemUnderTest = new LoginButtonController(new LoginButtonViewModel());
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
