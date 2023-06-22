import { waitFor } from "@testing-library/react";
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

  test("login calls the use case", () => {
    executeAsyncMock.mockResolvedValueOnce();

    systemUnderTest.login("username", "password");

    expect(executeAsyncMock).toHaveBeenCalledTimes(1);
    expect(executeAsyncMock).toHaveBeenCalledWith({
      username: "username",
      password: "password",
    });
  });

  test("login sets loginFailed to false when the use case rejects", () => {
    executeAsyncMock.mockRejectedValueOnce("error");

    systemUnderTest.login("username", "password");

    waitFor(() => {
      expect(systemUnderTest["viewModel"].loginFailed.Value).toBe(true);
    });
  });
});
