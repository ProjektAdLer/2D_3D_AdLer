import { act, fireEvent, render } from "@testing-library/react";
import React from "react";
import BreakTimeNotificationOverview from "../../../../../Core/Presentation/React/GeneralComponents/BreakTimeNotificationOverview/BreakTimeNotificationOverview";
import { Provider } from "inversify-react";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";
import BreakTimeNotificationOverviewViewModel from "../../../../../Core/Presentation/React/GeneralComponents/BreakTimeNotificationOverview/BreakTimeNotificationOverviewViewModel";
import "@testing-library/jest-dom";
import IBreakTimeNotificationOverviewController from "../../../../../Core/Presentation/React/GeneralComponents/BreakTimeNotificationOverview/IBreakTimeNotificationOverviewController";
import mock from "jest-mock-extended/lib/Mock";

describe("BreakTimeNotificationOverview", () => {
  test("should render", () => {
    const viewModel = new BreakTimeNotificationOverviewViewModel();
    viewModel.showModal.Value = true;
    useBuilderMock([
      viewModel,
      mock<IBreakTimeNotificationOverviewController>(),
    ]);

    const renderResult = render(
      <Provider container={CoreDIContainer}>
        <BreakTimeNotificationOverview />
      </Provider>,
    );

    expect(renderResult.container).not.toBeEmptyDOMElement();
    expect(renderResult.container).toMatchSnapshot();
  });

  test("should not render without view model", () => {
    useBuilderMock([undefined, undefined]);

    const renderResult = render(
      <Provider container={CoreDIContainer}>
        <BreakTimeNotificationOverview />
      </Provider>,
    );

    expect(renderResult.container.firstChild).toBeNull();
  });

  test("should not render without view model show modal value", () => {
    const viewModel = new BreakTimeNotificationOverviewViewModel();
    viewModel.showModal.Value = false;
    useBuilderMock([
      viewModel,
      mock<IBreakTimeNotificationOverviewController>(),
    ]);

    const renderResult = render(
      <Provider container={CoreDIContainer}>
        <BreakTimeNotificationOverview />
      </Provider>,
    );

    expect(renderResult.container.firstChild).toBeNull();
  });

  test("should not render without controller", () => {
    const viewModel = new BreakTimeNotificationOverviewViewModel();
    viewModel.showModal.Value = true;
    useBuilderMock([viewModel, undefined]);

    const renderResult = render(
      <Provider container={CoreDIContainer}>
        <BreakTimeNotificationOverview />
      </Provider>,
    );

    expect(renderResult.container.firstChild).toBeNull();
  });

  test("calls controller with clicked notification", () => {
    const viewModel = new BreakTimeNotificationOverviewViewModel();
    viewModel.showModal.Value = true;
    const controllerMock = mock<IBreakTimeNotificationOverviewController>();
    useBuilderMock([viewModel, controllerMock]);

    const renderResult = render(
      <Provider container={CoreDIContainer}>
        <BreakTimeNotificationOverview />
      </Provider>,
    );

    const notificationElement = renderResult.getByTestId(
      viewModel.shortBreakTimeNotifications[0].titleKey,
    );
    act(() => {
      fireEvent.click(notificationElement);
    });

    expect(controllerMock.selectNotification).toHaveBeenCalledTimes(1);
    expect(controllerMock.selectNotification).toHaveBeenCalledWith(
      viewModel.shortBreakTimeNotifications[0],
    );
  });
});
