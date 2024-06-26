import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import { Provider } from "inversify-react";
import { mock } from "jest-mock-extended";
import React from "react";
import IGetLoginStatusUseCase from "../../../../../Core/Application/UseCases/GetLoginStatus/IGetLoginStatusUseCase";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "../../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import ISignInAndOutComponentController from "../../../../../Core/Presentation/React/WelcomePage/SignInAndOutComponent/ISignInAndOutComponentController";
import LoginComponent from "../../../../../Core/Presentation/React/WelcomePage/SignInAndOutComponent/LoginComponent";
import SignInAndOutComponentViewModel from "../../../../../Core/Presentation/React/WelcomePage/SignInAndOutComponent/SignInAndOutComponentViewModel";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";

const getLoginStatusUseCaseMock = mock<IGetLoginStatusUseCase>();

describe("LoginComponent", () => {
  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind<IGetLoginStatusUseCase>(
      USECASE_TYPES.IGetLoginStatusUseCase
    ).toConstantValue(getLoginStatusUseCaseMock);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("doesn't render without controller", () => {
    useBuilderMock([new SignInAndOutComponentViewModel(), undefined]);
    getLoginStatusUseCaseMock.execute.mockReturnValue({
      isLoggedIn: false,
      userName: undefined,
    });

    const { container } = render(
      <Provider container={CoreDIContainer}>
        <LoginComponent />
      </Provider>
    );

    expect(container.firstChild).toBeNull();
  });

  test("doesn't render without view model", () => {
    useBuilderMock([undefined, mock<ISignInAndOutComponentController>()]);
    getLoginStatusUseCaseMock.execute.mockReturnValue({
      isLoggedIn: false,
      userName: undefined,
    });

    const { container } = render(
      <Provider container={CoreDIContainer}>
        <LoginComponent />
      </Provider>
    );

    expect(container.firstChild).toBeNull();
  });

  test("LoginForm calls GetLoginStatusUseCase.execute on mount", () => {
    useBuilderMock([
      new SignInAndOutComponentViewModel(),
      mock<ISignInAndOutComponentController>(),
    ]);
    getLoginStatusUseCaseMock.execute.mockReturnValue({
      isLoggedIn: true,
      userName: undefined,
    });

    render(
      <Provider container={CoreDIContainer}>
        <LoginComponent />
      </Provider>
    );

    expect(getLoginStatusUseCaseMock.execute).toBeCalled();
  });

  test("should set text in username and password field", () => {
    const mockedController = mock<ISignInAndOutComponentController>();
    useBuilderMock([new SignInAndOutComponentViewModel(), mockedController]);
    getLoginStatusUseCaseMock.execute.mockReturnValue({
      isLoggedIn: false,
      userName: undefined,
    });

    const componentUnderTest = render(
      <Provider container={CoreDIContainer}>
        <LoginComponent />
      </Provider>
    );

    fireEvent.change(componentUnderTest.getByTestId("userName"), {
      target: { value: "testName" },
    });
    fireEvent.change(componentUnderTest.getByTestId("password"), {
      target: { value: "testPassword" },
    });

    fireEvent.click(componentUnderTest.getByTestId("loginButton"));

    expect(mockedController.login).toHaveBeenCalledWith(
      "testName",
      "testPassword"
    );
  });
});
