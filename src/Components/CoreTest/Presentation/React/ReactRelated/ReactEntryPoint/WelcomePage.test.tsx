import WelcomePage from "../../../../../Core/Presentation/React/ReactRelated/ReactEntryPoint/WelcomePage";
import { render, screen } from "@testing-library/react";
import useBuilderMock from "../CustomHooks/useBuilder/useBuilderMock";
import "@testing-library/jest-dom";
import React from "react";
import { Provider } from "inversify-react";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import { mock } from "jest-mock-extended";
import ILoginUseCase from "../../../../../Core/Application/UseCases/Login/ILoginUseCase";
import USECASE_TYPES from "../../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";

jest.mock(
  "../../../../../Core/Presentation/React/WelcomePage/LMSButton/LMSButtonView.tsx",
);

// Mock der LoginComponent
jest.mock(
  "../../../../../Core/Presentation/React/WelcomePage/SignInAndOutComponent/LoginComponent",
  () => {
    return function LoginComponent() {
      return <div data-testid="login-component">Login Component</div>;
    };
  },
);

// Mock der LogoutComponent
jest.mock(
  "../../../../../Core/Presentation/React/WelcomePage/SignInAndOutComponent/LogoutComponent",
  () => {
    return function LogoutComponent() {
      return <div data-testid="logout-component">Logout Component</div>;
    };
  },
);

const mockLoginUseCase = mock<ILoginUseCase>();

describe("Welcome Page", () => {
  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(USECASE_TYPES.ILoginUseCase).toConstantValue(
      mockLoginUseCase,
    );
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  beforeEach(() => {
    useBuilderMock([undefined, undefined]);
    mockLoginUseCase.executeAsync.mockClear();
    // Reset environment variable
    delete process.env.REACT_APP_IS_SHOWCASE;
  });

  test("should render in normal mode", () => {
    process.env.REACT_APP_IS_SHOWCASE = "false";

    render(
      <Provider container={CoreDIContainer}>
        <WelcomePage />
      </Provider>,
    );

    // In normal mode, login and logout components should be visible
    expect(screen.getByTestId("login-component")).toBeInTheDocument();
    expect(screen.getByTestId("logout-component")).toBeInTheDocument();
    expect(mockLoginUseCase.executeAsync).not.toHaveBeenCalled();
  });

  test("should render in showcase mode and trigger auto-login", () => {
    process.env.REACT_APP_IS_SHOWCASE = "true";

    render(
      <Provider container={CoreDIContainer}>
        <WelcomePage />
      </Provider>,
    );

    // In showcase mode, login and logout components should be hidden
    expect(screen.queryByTestId("login-component")).not.toBeInTheDocument();
    expect(screen.queryByTestId("logout-component")).not.toBeInTheDocument();

    // Auto-login should be triggered
    expect(mockLoginUseCase.executeAsync).toHaveBeenCalledWith({
      username: "showcase",
      password: "showcase",
    });
    expect(mockLoginUseCase.executeAsync).toHaveBeenCalledTimes(1);
  });

  test("should not trigger auto-login when REACT_APP_IS_SHOWCASE is not 'true'", () => {
    process.env.REACT_APP_IS_SHOWCASE = "false";

    render(
      <Provider container={CoreDIContainer}>
        <WelcomePage />
      </Provider>,
    );

    expect(mockLoginUseCase.executeAsync).not.toHaveBeenCalled();
  });

  test("should not trigger auto-login when REACT_APP_IS_SHOWCASE is undefined", () => {
    // REACT_APP_IS_SHOWCASE is already deleted in beforeEach

    render(
      <Provider container={CoreDIContainer}>
        <WelcomePage />
      </Provider>,
    );

    expect(mockLoginUseCase.executeAsync).not.toHaveBeenCalled();
  });

  test("should show welcome picture in both normal and showcase mode", () => {
    // Test normal mode
    process.env.REACT_APP_IS_SHOWCASE = "false";

    const { rerender } = render(
      <Provider container={CoreDIContainer}>
        <WelcomePage />
      </Provider>,
    );

    expect(screen.getByAltText("3D Welcome Text")).toBeInTheDocument();

    // Test showcase mode
    process.env.REACT_APP_IS_SHOWCASE = "true";

    rerender(
      <Provider container={CoreDIContainer}>
        <WelcomePage />
      </Provider>,
    );

    // Welcome picture should still be visible in showcase mode
    expect(screen.getByAltText("3D Welcome Text")).toBeInTheDocument();
  });

  test("should always show welcome page buttons in both modes", () => {
    // Test normal mode
    process.env.REACT_APP_IS_SHOWCASE = "false";

    const { rerender } = render(
      <Provider container={CoreDIContainer}>
        <WelcomePage />
      </Provider>,
    );

    // WelcomePageButtons should be present (checking for their sections)
    const buttonSection = screen
      .getByRole("img", { name: /adler logo/i })
      .parentElement?.querySelector("section:nth-child(4)");
    expect(buttonSection).toBeInTheDocument();

    // Test showcase mode
    process.env.REACT_APP_IS_SHOWCASE = "true";

    rerender(
      <Provider container={CoreDIContainer}>
        <WelcomePage />
      </Provider>,
    );

    // WelcomePageButtons should still be present
    const buttonSectionShowcase = screen
      .getByRole("img", { name: /adler logo/i })
      .parentElement?.querySelector("section:nth-child(4)");
    expect(buttonSectionShowcase).toBeInTheDocument();
  });
});
