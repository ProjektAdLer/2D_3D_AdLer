import LoginUseCase from "../../../../../Core/Application/UseCases/Login/LoginUseCase";
import LoginComponentController from "../../../../../Core/Presentation/React/WelcomePage/LoginComponent/LoginComponentController";
import LoginComponentViewModel from "../../../../../Core/Presentation/React/WelcomePage/LoginComponent/LoginComponentViewModel";

const executeAsyncMock = jest.spyOn(LoginUseCase.prototype, "executeAsync");

describe("LoginComponentController", () => {
  let systemUnderTest: LoginComponentController;

  beforeEach(() => {
    systemUnderTest = new LoginComponentController(
      new LoginComponentViewModel()
    );
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
