import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import { getByTitle, waitFor } from "@testing-library/dom";
import { Provider } from "inversify-react";
import { mock } from "jest-mock-extended";
import React from "react";
import IGetLoginStatusUseCase from "../../../../../Core/Application/UseCases/GetLoginStatus/IGetLoginStatusUseCase";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "../../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import ILoginComponentController from "../../../../../Core/Presentation/React/WelcomePage/LoginComponent/ILoginComponentController";
import LoginComponent from "../../../../../Core/Presentation/React/WelcomePage/LoginComponent/LoginComponent";
import LoginComponentViewModel from "../../../../../Core/Presentation/React/WelcomePage/LoginComponent/LoginComponentViewModel";
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
    useBuilderMock([new LoginComponentViewModel(), undefined]);

    const { container } = render(
      <Provider container={CoreDIContainer}>
        <LoginComponent />
      </Provider>
    );

    expect(container.firstChild).toBeNull();
  });

  test("doesn't render without view model", () => {
    useBuilderMock([undefined, mock<ILoginComponentController>()]);

    const { container } = render(
      <Provider container={CoreDIContainer}>
        <LoginComponent />
      </Provider>
    );

    expect(container.firstChild).toBeNull();
  });

  test("LoginComponent calls GetLoginStatusUseCase.execute on mount", () => {
    useBuilderMock([
      new LoginComponentViewModel(),
      mock<ILoginComponentController>(),
    ]);

    render(
      <Provider container={CoreDIContainer}>
        <LoginComponent />
      </Provider>
    );

    expect(getLoginStatusUseCaseMock.execute).toBeCalled();
  });

  test("LoginComponent Tailwind Styling contains normal backgroundColor if not logged in", () => {
    let fakeModel = new LoginComponentViewModel();
    fakeModel.userLoggedIn.Value = false;
    getLoginStatusUseCaseMock.execute.mockReturnValue(false);
    useBuilderMock([fakeModel, mock<ILoginComponentController>()]);

    const componentUnderTest = render(
      <Provider container={CoreDIContainer}>
        <LoginComponent />
      </Provider>
    );

    const buttonStyle =
      componentUnderTest.getByTestId("login-button").className;
    expect(buttonStyle).toMatchSnapshot();
  });

  test("LoginComponent Tailwind Styling contains green backgroundColor if logged in", () => {
    let fakeModel = new LoginComponentViewModel();
    fakeModel.userLoggedIn.Value = true;
    getLoginStatusUseCaseMock.execute.mockReturnValue(true);
    useBuilderMock([fakeModel, mock<ILoginComponentController>()]);

    const componentUnderTest = render(
      <Provider container={CoreDIContainer}>
        <LoginComponent />
      </Provider>
    );

    const buttonStyle =
      componentUnderTest.getByTestId("login-button").className;
    expect(buttonStyle).toMatchSnapshot();
  });

  test("should render modal when clicked", () => {
    useBuilderMock([
      new LoginComponentViewModel(),
      mock<ILoginComponentController>(),
    ]);

    const componentUnderTest = render(
      <Provider container={CoreDIContainer}>
        <LoginComponent />
      </Provider>
    );
    fireEvent.click(componentUnderTest.getByTestId("login-button"));

    expect(
      componentUnderTest.findByTitle("Moodle Login")
    ).resolves.toBeInTheDocument();
  });
});
