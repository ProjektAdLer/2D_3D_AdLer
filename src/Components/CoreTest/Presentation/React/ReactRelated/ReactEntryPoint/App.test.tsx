import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import App from "../../../../../Core/Presentation/React/ReactRelated/ReactEntryPoint/App";
import history from "~ReactEntryPoint/history";
import React from "react";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import IGetLoginStatusUseCase from "../../../../../Core/Application/UseCases/GetLoginStatus/IGetLoginStatusUseCase";
import USECASE_TYPES from "../../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import { mock } from "jest-mock-extended";
import { Provider } from "inversify-react";

jest.mock(
  "../../../../../Core/Presentation/React/ReactRelated/ReactEntryPoint/LearningWorldMenu.tsx",
  () => "mocked",
);
jest.mock(
  "../../../../../Core/Presentation/React/ReactRelated/ReactEntryPoint/LearningSpace.tsx",
  () => "mocked",
);
jest.mock(
  "../../../../../Core/Presentation/React/ReactRelated/ReactEntryPoint/LearningSpaceMenu.tsx",
  () => "mocked",
);
jest.mock(
  "../../../../../Core/Presentation/React/ReactRelated/ReactEntryPoint/WelcomePage.tsx",
  () => "mocked",
);
const getLoginStatusUseCaseMock = mock<IGetLoginStatusUseCase>();

describe("App", () => {
  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind<IGetLoginStatusUseCase>(
      USECASE_TYPES.IGetLoginStatusUseCase,
    ).toConstantValue(getLoginStatusUseCaseMock);
  });
  beforeEach(() => {
    getLoginStatusUseCaseMock.execute.mockReturnValue({
      isLoggedIn: true,
      userName: "",
    });
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });
  test("should render", () => {
    render(
      <Provider container={CoreDIContainer}>
        <App />
      </Provider>,
    );
  });

  test("App works if pathname is /spacedisplay", () => {
    render(
      <Provider container={CoreDIContainer}>
        <App />
      </Provider>,
    );
    history.push("/spacedisplay");
    expect(history.location.pathname).toBe("/spacedisplay");
  });

  test("App works if user is not logged in", () => {
    getLoginStatusUseCaseMock.execute.mockReturnValue({
      isLoggedIn: false,
      userName: "",
    });
    render(
      <Provider container={CoreDIContainer}>
        <App />
      </Provider>,
    );
    expect(history.location.pathname).toBe("/");
  });

  test("App works if pathname is /spacemenu", () => {
    render(
      <Provider container={CoreDIContainer}>
        <App />
      </Provider>,
    );
    history.push("/spacemenu");
    expect(history.location.pathname).toBe("/spacemenu");
  });

  test("App works if pathname is /worldmenu", () => {
    render(
      <Provider container={CoreDIContainer}>
        <App />
      </Provider>,
    );
    history.push("/worldmenu");
    expect(history.location.pathname).toBe("/worldmenu");
  });

  test("App works if pathname is /spacemenu", () => {
    render(
      <Provider container={CoreDIContainer}>
        <App />
      </Provider>,
    );
    history.push("/spacemenu");
    expect(history.location.pathname).toBe("/spacemenu");
  });
});
