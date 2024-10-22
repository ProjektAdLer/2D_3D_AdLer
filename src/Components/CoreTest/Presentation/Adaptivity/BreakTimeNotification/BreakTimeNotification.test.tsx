import {
  cleanup,
  fireEvent,
  getByText,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import BreakTimeNotification from "../../../../Core/Presentation/Adaptivity/BreakTimeNotification/BreakTimeNotification";
import useBuilderMock from "../../React/ReactRelated/CustomHooks/useBuilder/useBuilderMock";
import IBreakTimeNotificationController from "../../../../Core/Presentation/Adaptivity/BreakTimeNotification/IBreakTimeNotificationController";
import { mock } from "jest-mock-extended";
import BreakTimeNotificationViewModel from "../../../../Core/Presentation/Adaptivity/BreakTimeNotification/BreakTimeNotificationViewModel";
import { BreakTimeNotificationType } from "../../../../Core/Domain/Entities/Adaptivity/BreakTimeNotificationEntity";
import { shortBreakTimeNotificationContents } from "../../../../Core/Domain/BreakTimeNotifications/BreakTimeNotifications";

const mockController = mock<IBreakTimeNotificationController>();

describe("BreakTimeNotification", () => {
  let viewModel = new BreakTimeNotificationViewModel();

  beforeEach(() => {
    viewModel = new BreakTimeNotificationViewModel();
  });

  beforeAll(() => {
    jest.spyOn(Math, "random").mockReturnValue(0); // gets pool with 4 images
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("should not render if view model is null", () => {
    useBuilderMock([null, mockController]);

    const { container } = render(<BreakTimeNotification />);

    expect(container).toBeEmptyDOMElement();
  });

  // ANF-ID: [EKJ0001]
  test("should render small button when showMinimized is true", () => {
    useBuilderMock([viewModel, mockController]);
    viewModel.showModal.Value = true;
    viewModel.notificationToDisplay.Value =
      shortBreakTimeNotificationContents[0];
    viewModel.showMinimizedModal.Value = true;

    render(<BreakTimeNotification />);

    expect(screen.getByText("pauseInfo")).toBeInTheDocument();
  });

  // ANF-ID: [EKJ0002]
  test("should call controller when clicked in minimized form", () => {
    useBuilderMock([viewModel, mockController]);
    viewModel.showModal.Value = true;
    viewModel.notificationToDisplay.Value =
      shortBreakTimeNotificationContents[0];
    viewModel.showMinimizedModal.Value = true;

    render(<BreakTimeNotification />);
    fireEvent.click(screen.getByAltText("Pause Icon"));

    expect(
      mockController.minimizeOrMaximizeBreakNotification,
    ).toHaveBeenCalledTimes(1);
  });

  // ANF-ID: [EKJ0005]
  test("should call controller when closed in minimized form", () => {
    useBuilderMock([viewModel, mockController]);
    viewModel.showModal.Value = true;
    viewModel.notificationToDisplay.Value =
      shortBreakTimeNotificationContents[0];
    viewModel.showMinimizedModal.Value = true;

    render(<BreakTimeNotification />);
    fireEvent.click(screen.getByAltText("CloseButton"));

    expect(mockController.closeBreakNotification).toHaveBeenCalledTimes(1);
  });

  // ANF-ID: [EKJ0004, EKJ0005, EKJ0006]
  test("click on close button calls closedBreakNotification on controller", () => {
    useBuilderMock([viewModel, mockController]);
    viewModel.showModal.Value = true;
    viewModel.notificationToDisplay.Value =
      shortBreakTimeNotificationContents[0];

    const { getByAltText } = render(<BreakTimeNotification />);
    const closeButton = getByAltText("CloseButton");

    closeButton.click();

    expect(mockController.closeBreakNotification).toHaveBeenCalledTimes(1);
  });
});
