import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { mock } from "jest-mock-extended";
import React from "react";
import SideBarButton from "../../../../../Core/Presentation/React/LearningSpaceDisplay/SideBar/SideBarButton";
import { SideBarButtonConfig } from "../../../../../Core/Presentation/React/LearningSpaceDisplay/SideBar/SideBarButtons";
import SideBarViewModel from "../../../../../Core/Presentation/React/LearningSpaceDisplay/SideBar/SideBarViewModel";
import ISideBarController from "../../../../../Core/Presentation/React/LearningSpaceDisplay/SideBar/ISideBarController";

// Mock components
jest.mock(
  "../../../../../Core/Presentation/React/LearningSpaceDisplay/FullscreenSwitch/FullscreenSwitch",
  () => {
    return function MockFullscreenSwitch() {
      return <div data-testid="fullscreen-switch">Fullscreen Switch</div>;
    };
  },
);

jest.mock(
  "../../../../../Core/Presentation/React/GeneralComponents/HelpDeskButton/HelpDeskButton",
  () => {
    return function MockHelpDeskButton() {
      return <div data-testid="help-desk-button">Help Desk Button</div>;
    };
  },
);

jest.mock(
  "../../../../../Core/Presentation/React/GeneralComponents/HelpDeskModal/HelpDeskModal",
  () => {
    return function MockHelpDeskModal() {
      return <div data-testid="help-desk-modal">Help Desk Modal</div>;
    };
  },
);

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe("SideBarButton", () => {
  let viewModel: SideBarViewModel;
  let controllerMock: ISideBarController;

  beforeEach(() => {
    viewModel = new SideBarViewModel();
    controllerMock = mock<ISideBarController>();
  });

  test("should render regular button", () => {
    const buttonConfig: SideBarButtonConfig = {
      id: "mainMenu",
      icon: "test-icon.svg",
      tooltip: "tooltip",
      label: "label",
      onClick: "onMainMenuButtonClicked",
    };

    render(
      <SideBarButton
        button={buttonConfig}
        viewModel={viewModel}
        controller={controllerMock}
      />,
    );

    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByText("label")).toBeInTheDocument();
  });

  test("should call controller method when clicked", () => {
    const buttonConfig: SideBarButtonConfig = {
      id: "controls",
      icon: "test-icon.svg",
      tooltip: "tooltip",
      label: "label",
      onClick: "onControlsExplanationButtonClicked",
    };

    render(
      <SideBarButton
        button={buttonConfig}
        viewModel={viewModel}
        controller={controllerMock}
      />,
    );

    fireEvent.click(screen.getByRole("button"));
    expect(
      controllerMock.onControlsExplanationButtonClicked,
    ).toHaveBeenCalledTimes(1);
  });

  test("should render disabled button", () => {
    const buttonConfig: SideBarButtonConfig = {
      id: "test",
      icon: "test-icon.svg",
      tooltip: "tooltip",
      label: "label",
      onClick: "onControlsExplanationButtonClicked",
      disabled: () => true,
    };

    render(
      <SideBarButton
        button={buttonConfig}
        viewModel={viewModel}
        controller={controllerMock}
      />,
    );

    expect(screen.getByRole("button")).toBeDisabled();
  });

  test("should render FullscreenSwitch component", () => {
    const buttonConfig: SideBarButtonConfig = {
      id: "fullscreen",
      icon: "",
      tooltip: "tooltip",
      label: "label",
      onClick: "onMainMenuButtonClicked",
      isSpecialComponent: true,
      component: "FullscreenSwitch",
    };

    render(
      <SideBarButton
        button={buttonConfig}
        viewModel={viewModel}
        controller={controllerMock}
      />,
    );

    expect(screen.getByTestId("fullscreen-switch")).toBeInTheDocument();
  });

  test("should render HelpDesk components", () => {
    const buttonConfig: SideBarButtonConfig = {
      id: "help",
      icon: "",
      tooltip: "tooltip",
      label: "label",
      onClick: "onMainMenuButtonClicked",
      isSpecialComponent: true,
      component: "HelpDesk",
    };

    render(
      <SideBarButton
        button={buttonConfig}
        viewModel={viewModel}
        controller={controllerMock}
      />,
    );

    expect(screen.getByTestId("help-desk-button")).toBeInTheDocument();
    expect(screen.getByTestId("help-desk-modal")).toBeInTheDocument();
  });

  test("should handle unknown special component", () => {
    const buttonConfig: SideBarButtonConfig = {
      id: "unknown",
      icon: "",
      tooltip: "tooltip",
      label: "label",
      onClick: "onMainMenuButtonClicked",
      isSpecialComponent: true,
      component: "UnknownComponent",
    };

    render(
      <SideBarButton
        button={buttonConfig}
        viewModel={viewModel}
        controller={controllerMock}
      />,
    );

    expect(screen.getByText("label")).toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
