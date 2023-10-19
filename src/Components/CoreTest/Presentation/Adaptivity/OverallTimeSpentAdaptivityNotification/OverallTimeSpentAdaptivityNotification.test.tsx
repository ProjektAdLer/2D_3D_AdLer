import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import OverallTimeSpentAdaptivityNotification from "../../../../Core/Presentation/Adaptivity/OverallTimeSpentAdaptivityNotification/OverallTimeSpentAdaptivityNotification";
import useBuilderMock from "../../React/ReactRelated/CustomHooks/useBuilder/useBuilderMock";
import IOverallTimeSpentAdaptivityNotificationController from "../../../../Core/Presentation/Adaptivity/OverallTimeSpentAdaptivityNotification/IOverallTimeSpentAdaptivityNotificationController";
import { mock } from "jest-mock-extended";
import OverallTimeSpentAdaptivityNotificationViewModel from "../../../../Core/Presentation/Adaptivity/OverallTimeSpentAdaptivityNotification/OverallTimeSpentAdaptivityNotificationViewModel";
import { OverallTimeSpentAdaptivityNotificationBreakType } from "../../../../Core/Domain/Entities/Adaptivity/OverallTimeSpentAdaptivityNotificationEntity";

const mockController =
  mock<IOverallTimeSpentAdaptivityNotificationController>();

describe("OverallTimeSpentAdaptivityNotification", () => {
  let viewModel = new OverallTimeSpentAdaptivityNotificationViewModel();

  beforeEach(() => {
    viewModel = new OverallTimeSpentAdaptivityNotificationViewModel();
  });

  test("should not render if view model is null", () => {
    useBuilderMock([null, mockController]);

    const { container } = render(<OverallTimeSpentAdaptivityNotification />);

    expect(container).toBeEmptyDOMElement();
  });

  test("should render short break content when break type is set to Short", () => {
    useBuilderMock([viewModel, mockController]);
    viewModel.showModal.Value = true;
    viewModel.breakType.Value =
      OverallTimeSpentAdaptivityNotificationBreakType.Short;

    const { container } = render(<OverallTimeSpentAdaptivityNotification />);
    const shortBreak = container.querySelector("[data-testid=short-break]");

    expect(shortBreak).toBeTruthy();
  });

  test("should render medium break content when break type is set to Medium", () => {
    useBuilderMock([viewModel, mockController]);
    viewModel.showModal.Value = true;
    viewModel.breakType.Value =
      OverallTimeSpentAdaptivityNotificationBreakType.Medium;

    const { container } = render(<OverallTimeSpentAdaptivityNotification />);
    const mediumBreak = container.querySelector("[data-testid=medium-break]");

    expect(mediumBreak).toBeTruthy();
  });

  test("should render long break content when break type is set to Long", () => {
    useBuilderMock([viewModel, mockController]);
    viewModel.showModal.Value = true;
    viewModel.breakType.Value =
      OverallTimeSpentAdaptivityNotificationBreakType.Long;

    const { container } = render(<OverallTimeSpentAdaptivityNotification />);
    const longBreak = container.querySelector("[data-testid=long-break]");

    expect(longBreak).toBeTruthy();
  });
  test("should render small button when showMinimized is true", () => {
    useBuilderMock([viewModel, mockController]);
    viewModel.showModal.Value = true;
    viewModel.breakType.Value =
      OverallTimeSpentAdaptivityNotificationBreakType.Long;
    viewModel.showMinimizedModal.Value = true;

    render(<OverallTimeSpentAdaptivityNotification />);

    expect(screen.getByText("Zeit für eine Pause!")).toBeInTheDocument();
  });
  test("should call controller when clicked in minimized form", () => {
    useBuilderMock([viewModel, mockController]);
    viewModel.showModal.Value = true;
    viewModel.breakType.Value =
      OverallTimeSpentAdaptivityNotificationBreakType.Long;
    viewModel.showMinimizedModal.Value = true;

    render(<OverallTimeSpentAdaptivityNotification />);
    fireEvent.click(screen.getByText("Zeit für eine Pause!"));

    expect(
      mockController.minimizeOrMaximizeBreakNotification
    ).toHaveBeenCalledTimes(1);
  });
  test("should call controller when closed in minimized form", () => {
    useBuilderMock([viewModel, mockController]);
    viewModel.showModal.Value = true;
    viewModel.breakType.Value =
      OverallTimeSpentAdaptivityNotificationBreakType.Long;
    viewModel.showMinimizedModal.Value = true;

    render(<OverallTimeSpentAdaptivityNotification />);
    fireEvent.click(screen.getByText("x"));

    expect(mockController.closeBreakNotification).toHaveBeenCalledTimes(1);
  });

  test("click on close button calls closedBreakNotification on controller", () => {
    useBuilderMock([viewModel, mockController]);
    viewModel.showModal.Value = true;
    viewModel.breakType.Value =
      OverallTimeSpentAdaptivityNotificationBreakType.Short;

    const { getByRole } = render(<OverallTimeSpentAdaptivityNotification />);
    const closeButton = getByRole("button");

    closeButton.click();

    expect(
      mockController.minimizeOrMaximizeBreakNotification
    ).toHaveBeenCalledTimes(1);
  });
});
