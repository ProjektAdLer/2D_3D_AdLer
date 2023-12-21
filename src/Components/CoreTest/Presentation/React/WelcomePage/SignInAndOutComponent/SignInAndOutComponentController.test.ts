import { waitFor } from "@testing-library/react";
import LoginUseCase from "../../../../../Core/Application/UseCases/Login/LoginUseCase";
import SignInAndOutComponentController from "../../../../../Core/Presentation/React/WelcomePage/SignInAndOutComponent/SignInAndOutComponentController";
import SignInAndOutComponentViewModel from "../../../../../Core/Presentation/React/WelcomePage/SignInAndOutComponent/SignInAndOutComponentViewModel";
import LogoutUseCase from "../../../../../Core/Application/UseCases/Logout/LogoutUseCase";
import { mock } from "jest-mock-extended";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "../../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";

const loginUseCaseMock = mock<LoginUseCase>();
const logoutUseCaseMock = mock<LogoutUseCase>();

describe("SignInAndOutComponentController", () => {
  let systemUnderTest: SignInAndOutComponentController;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(USECASE_TYPES.ILoginUseCase).toConstantValue(
      loginUseCaseMock
    );
    CoreDIContainer.rebind(USECASE_TYPES.ILogoutUseCase).toConstantValue(
      logoutUseCaseMock
    );
  });

  beforeEach(() => {
    systemUnderTest = new SignInAndOutComponentController(
      new SignInAndOutComponentViewModel()
    );
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("login calls the use case", () => {
    loginUseCaseMock.executeAsync.mockResolvedValueOnce();

    systemUnderTest.login("username", "password");

    expect(loginUseCaseMock.executeAsync).toHaveBeenCalledTimes(1);
    expect(loginUseCaseMock.executeAsync).toHaveBeenCalledWith({
      username: "username",
      password: "password",
    });
  });

  test("login sets loginFailed to false when the use case rejects", () => {
    loginUseCaseMock.executeAsync.mockRejectedValueOnce("error");

    systemUnderTest.login("username", "password");

    waitFor(() => {
      expect(systemUnderTest["viewModel"].loginFailed.Value).toBe(true);
    });
  });

  test("logout calls the use case", () => {
    systemUnderTest.logout();

    expect(logoutUseCaseMock.execute).toHaveBeenCalledTimes(1);
  });
});
