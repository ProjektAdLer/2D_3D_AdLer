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
    viewModel.breakType.Value = BreakTimeNotificationType.Medium;
    viewModel.showMinimizedModal.Value = true;

    render(<BreakTimeNotification />);

    expect(screen.getByText("pauseInfo")).toBeInTheDocument();
  });

  // ANF-ID: [EKJ0002]
  test("should call controller when clicked in minimized form", () => {
    useBuilderMock([viewModel, mockController]);
    viewModel.showModal.Value = true;
    viewModel.breakType.Value = BreakTimeNotificationType.Long;
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
    viewModel.breakType.Value = BreakTimeNotificationType.Long;
    viewModel.showMinimizedModal.Value = true;

    render(<BreakTimeNotification />);
    fireEvent.click(screen.getByAltText("CloseButton"));

    expect(mockController.closeBreakNotification).toHaveBeenCalledTimes(1);
  });

  // ANF-ID: [EKJ0002]
  test.each([
    [
      "id-slide-1",
      1,
      [
        BreakTimeNotificationType.Short,
        BreakTimeNotificationType.Medium,
        BreakTimeNotificationType.Long,
      ],
    ],
    [
      "id-slide-2",
      2,
      [
        BreakTimeNotificationType.Short,
        BreakTimeNotificationType.Medium,
        BreakTimeNotificationType.Long,
      ],
    ],
    [
      "id-slide-3",
      3,
      [
        BreakTimeNotificationType.Short,
        BreakTimeNotificationType.Medium,
        BreakTimeNotificationType.Long,
      ],
    ],
    [
      "id-slide-4",
      4,
      [BreakTimeNotificationType.Short, BreakTimeNotificationType.Medium],
    ],
  ])(
    "should render slide with id %s, index %s and type %s ",
    (testid, index, types) => {
      types.forEach((type) => {
        useBuilderMock([viewModel, mockController]);
        viewModel.showModal.Value = true;
        viewModel.breakType.Value = type;
        viewModel.slideIndex.Value = index;
        render(<BreakTimeNotification />);
        expect(screen.getByTestId(testid)).toBeInTheDocument();
        cleanup();
      });
    },
  );

  // ANF-ID: [EKJ0004, EKJ0005, EKJ0006]
  test("click on close button calls closedBreakNotification on controller", () => {
    useBuilderMock([viewModel, mockController]);
    viewModel.showModal.Value = true;
    viewModel.breakType.Value = BreakTimeNotificationType.Short;
    viewModel.slideIndex.Value = 0;

    const { getByAltText } = render(<BreakTimeNotification />);
    const closeButton = getByAltText("CloseButton");

    closeButton.click();

    expect(mockController.closeBreakNotification).toHaveBeenCalledTimes(1);
  });

  test.each([
    ["breakSliderButton1", 1],
    ["breakSliderButton2", 2],
    ["breakSliderButton3", 3],
    ["breakSliderButton4", 4],
  ])(
    "should call controller if button with id %s is clicked and sets slider index to %s",
    (testid, index) => {
      useBuilderMock([viewModel, mockController]);
      viewModel.showModal.Value = true;
      viewModel.breakType.Value = BreakTimeNotificationType.Medium;
      viewModel.slideIndex.Value = 0;

      const renderResult = render(<BreakTimeNotification />);
      waitFor(() => {
        fireEvent.click(renderResult.getByTestId(testid));
        expect(mockController.setSliderIndex).toHaveBeenCalledWith(index);
      });
    },
  );
});
