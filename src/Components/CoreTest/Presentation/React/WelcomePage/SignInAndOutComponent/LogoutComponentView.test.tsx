import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import { Provider } from "inversify-react";
import { mock } from "jest-mock-extended";
import React from "react";
import IGetLoginStatusUseCase from "../../../../../Core/Application/UseCases/GetLoginStatus/IGetLoginStatusUseCase";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "../../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import ISignInAndOutComponentController from "../../../../../Core/Presentation/React/WelcomePage/SignInAndOutComponent/ISignInAndOutComponentController";
import LogoutComponent from "../../../../../Core/Presentation/React/WelcomePage/SignInAndOutComponent/LogoutComponent";
import SignInAndOutComponentViewModel from "../../../../../Core/Presentation/React/WelcomePage/SignInAndOutComponent/SignInAndOutComponentViewModel";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";

const getLoginStatusUseCaseMock = mock<IGetLoginStatusUseCase>();

describe("LogoutComponent", () => {
  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind<IGetLoginStatusUseCase>(
      USECASE_TYPES.IGetLoginStatusUseCase
    ).toConstantValue(getLoginStatusUseCaseMock);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("Calls GetLoginStatusUseCase.execute on mount", () => {
    useBuilderMock([
      new SignInAndOutComponentViewModel(),
      mock<ISignInAndOutComponentController>(),
    ]);
    getLoginStatusUseCaseMock.execute.mockReturnValue({
      isLoggedIn: false,
      userName: undefined,
    });

    render(
      <Provider container={CoreDIContainer}>
        <LogoutComponent />
      </Provider>
    );

    expect(getLoginStatusUseCaseMock.execute).toHaveBeenCalled();
  });
  test("Calls Controller logout on click", () => {
    const controllerMock = mock<ISignInAndOutComponentController>();
    useBuilderMock([new SignInAndOutComponentViewModel(), controllerMock]);
    getLoginStatusUseCaseMock.execute.mockReturnValue({
      isLoggedIn: true,
      userName: undefined,
    });

    const { getByTestId } = render(
      <Provider container={CoreDIContainer}>
        <LogoutComponent />
      </Provider>
    );

    fireEvent.click(getByTestId("logout"));

    expect(controllerMock.logout).toHaveBeenCalled();
  });
});
