import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import BreakTimeNotification from "../../../../Core/Presentation/Adaptivity/BreakTimeNotification/BreakTimeNotification";
import useBuilderMock from "../../React/ReactRelated/CustomHooks/useBuilder/useBuilderMock";
import IBreakTimeNotificationController from "../../../../Core/Presentation/Adaptivity/BreakTimeNotification/IBreakTimeNotificationController";
import { mock } from "jest-mock-extended";
import BreakTimeNotificationViewModel from "../../../../Core/Presentation/Adaptivity/BreakTimeNotification/BreakTimeNotificationViewModel";
import { BreakTimeNotificationType } from "../../../../Core/Domain/Entities/Adaptivity/BreakTimeNotificationEntity";

const mockController = mock<IBreakTimeNotificationController>();

describe("BreakTimeNotification", () => {
  let viewModel = new BreakTimeNotificationViewModel();

  beforeEach(() => {
    viewModel = new BreakTimeNotificationViewModel();
  });

  test("should not render if view model is null", () => {
    useBuilderMock([null, mockController]);

    const { container } = render(<BreakTimeNotification />);

    expect(container).toBeEmptyDOMElement();
  });

  test("should render short break content when break type is set to Short", () => {
    useBuilderMock([viewModel, mockController]);
    viewModel.showModal.Value = true;
    viewModel.breakType.Value = BreakTimeNotificationType.Short;

    const { container } = render(<BreakTimeNotification />);
    const shortBreak = container.querySelector("[data-testid=short-break]");

    expect(shortBreak).toBeTruthy();
  });

  test("should render medium break content when break type is set to Medium", () => {
    useBuilderMock([viewModel, mockController]);
    viewModel.showModal.Value = true;
    viewModel.breakType.Value = BreakTimeNotificationType.Medium;

    const { container } = render(<BreakTimeNotification />);
    const mediumBreak = container.querySelector("[data-testid=medium-break]");

    expect(mediumBreak).toBeTruthy();
  });

  test("should render long break content when break type is set to Long", () => {
    useBuilderMock([viewModel, mockController]);
    viewModel.showModal.Value = true;
    viewModel.breakType.Value = BreakTimeNotificationType.Long;

    const { container } = render(<BreakTimeNotification />);
    const longBreak = container.querySelector("[data-testid=long-break]");

    expect(longBreak).toBeTruthy();
  });
  test("should render small button when showMinimized is true", () => {
    useBuilderMock([viewModel, mockController]);
    viewModel.showModal.Value = true;
    viewModel.breakType.Value = BreakTimeNotificationType.Long;
    viewModel.showMinimizedModal.Value = true;

    render(<BreakTimeNotification />);

    expect(screen.getByText("Zeit für eine Pause!")).toBeInTheDocument();
  });
  test("should call controller when clicked in minimized form", () => {
    useBuilderMock([viewModel, mockController]);
    viewModel.showModal.Value = true;
    viewModel.breakType.Value = BreakTimeNotificationType.Long;
    viewModel.showMinimizedModal.Value = true;

    render(<BreakTimeNotification />);
    fireEvent.click(screen.getByText("Zeit für eine Pause!"));

    expect(
      mockController.minimizeOrMaximizeBreakNotification
    ).toHaveBeenCalledTimes(1);
  });
  test("should call controller when closed in minimized form", () => {
    useBuilderMock([viewModel, mockController]);
    viewModel.showModal.Value = true;
    viewModel.breakType.Value = BreakTimeNotificationType.Long;
    viewModel.showMinimizedModal.Value = true;

    render(<BreakTimeNotification />);
    fireEvent.click(screen.getByText("x"));

    expect(mockController.closeBreakNotification).toHaveBeenCalledTimes(1);
  });

  test("click on close button calls closedBreakNotification on controller", () => {
    useBuilderMock([viewModel, mockController]);
    viewModel.showModal.Value = true;
    viewModel.breakType.Value = BreakTimeNotificationType.Short;

    const { getByRole } = render(<BreakTimeNotification />);
    const closeButton = getByRole("button");

    closeButton.click();

    expect(
      mockController.minimizeOrMaximizeBreakNotification
    ).toHaveBeenCalledTimes(1);
  });
});
