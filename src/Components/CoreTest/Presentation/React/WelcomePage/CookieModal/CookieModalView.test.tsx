import { fireEvent, render } from "@testing-library/react";
import React from "react";
import CookieModal from "../../../../../Core/Presentation/React/WelcomePage/CookieModal/CookieModal";
import ICookieModalController from "../../../../../Core/Presentation/React/WelcomePage/CookieModal/ICookieModalController";
import { Provider } from "inversify-react";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";
import { mock } from "jest-mock-extended";
import CookieModalViewModel from "../../../../../Core/Presentation/React/WelcomePage/CookieModal/CookieModalViewModel";

describe("CookieModal", () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  test("doesn't render without controller", () => {
    useBuilderMock([new CookieModalViewModel(), undefined]);

    const result = render(
      <Provider container={CoreDIContainer}>
        <CookieModal />
      </Provider>,
    );

    expect(result.container.firstChild).toBeNull();
  });

  // Test 1: No LocalStorage entry -> Modal is shown
  test("modal is shown when no cookie consent is stored (cookieConsent is null)", () => {
    const viewModel = new CookieModalViewModel();
    // Keep initial value as null (default)
    const mockedController = mock<ICookieModalController>();
    useBuilderMock([viewModel, mockedController]);

    const result = render(
      <Provider container={CoreDIContainer}>
        <CookieModal />
      </Provider>,
    );

    // Modal should be visible - check that container has modal content
    const modal = result.queryByTestId("cookieModal");
    expect(modal).toBeInTheDocument();

    // Also check that buttons are present
    expect(result.getByTestId("cookieAcceptAll")).toBeInTheDocument();
    expect(result.getByTestId("cookieDecline")).toBeInTheDocument();
  });

  // Test 2a: LocalStorage entry exists (accepted) -> Modal is NOT shown
  test("modal is NOT shown when cookie consent is 'accepted'", () => {
    const viewModel = new CookieModalViewModel();
    viewModel.cookieConsent.Value = "accepted";
    const mockedController = mock<ICookieModalController>();
    useBuilderMock([viewModel, mockedController]);

    const result = render(
      <Provider container={CoreDIContainer}>
        <CookieModal />
      </Provider>,
    );

    // Modal should not be visible - component returns null
    const modal = result.queryByTestId("cookieModal");
    expect(modal).not.toBeInTheDocument();

    // Container should be empty when modal is not shown
    expect(result.container.firstChild).toBeNull();
  });

  // Test 2b: LocalStorage entry exists (declined) -> Modal is NOT shown
  test("modal is NOT shown when cookie consent is 'declined'", () => {
    const viewModel = new CookieModalViewModel();
    viewModel.cookieConsent.Value = "declined";
    const mockedController = mock<ICookieModalController>();
    useBuilderMock([viewModel, mockedController]);

    const result = render(
      <Provider container={CoreDIContainer}>
        <CookieModal />
      </Provider>,
    );

    // Modal should not be visible - component returns null
    const modal = result.queryByTestId("cookieModal");
    expect(modal).not.toBeInTheDocument();

    // Container should be empty when modal is not shown
    expect(result.container.firstChild).toBeNull();
  });

  // Test 3: Accept button -> controller.accept() is called
  test("clicking accept button calls controller.accept()", () => {
    const viewModel = new CookieModalViewModel();
    // Keep initial value as null (default)
    const mockedController = mock<ICookieModalController>();
    useBuilderMock([viewModel, mockedController]);

    const result = render(
      <Provider container={CoreDIContainer}>
        <CookieModal />
      </Provider>,
    );

    const acceptButton = result.getByTestId("cookieAcceptAll");
    fireEvent.click(acceptButton);

    expect(mockedController.accept).toBeCalledTimes(1);
  });

  // Test 4: Decline button -> controller.decline() is called
  test("clicking decline button calls controller.decline()", () => {
    const viewModel = new CookieModalViewModel();
    // Keep initial value as null (default)
    const mockedController = mock<ICookieModalController>();
    useBuilderMock([viewModel, mockedController]);

    const result = render(
      <Provider container={CoreDIContainer}>
        <CookieModal />
      </Provider>,
    );

    const declineButton = result.getByTestId("cookieDecline");
    fireEvent.click(declineButton);

    expect(mockedController.decline).toBeCalledTimes(1);
  });

  // Integration Test: Modal closes after accept button click
  test("modal closes after clicking accept button (integration)", async () => {
    const viewModel = new CookieModalViewModel();
    const mockedController = mock<ICookieModalController>();

    // Mock controller to update viewModel like the real flow would do
    mockedController.accept.mockImplementation(() => {
      viewModel.cookieConsent.Value = "accepted";
    });

    useBuilderMock([viewModel, mockedController]);

    const result = render(
      <Provider container={CoreDIContainer}>
        <CookieModal />
      </Provider>,
    );

    // Modal should be visible initially
    expect(result.getByTestId("cookieModal")).toBeInTheDocument();

    const acceptButton = result.getByTestId("cookieAcceptAll");
    fireEvent.click(acceptButton);

    // Modal should close (not be in document anymore)
    expect(result.queryByTestId("cookieModal")).not.toBeInTheDocument();
  });

  // Integration Test: Modal closes after decline button click
  test("modal closes after clicking decline button (integration)", async () => {
    const viewModel = new CookieModalViewModel();
    const mockedController = mock<ICookieModalController>();

    // Mock controller to update viewModel like the real flow would do
    mockedController.decline.mockImplementation(() => {
      viewModel.cookieConsent.Value = "declined";
    });

    useBuilderMock([viewModel, mockedController]);

    const result = render(
      <Provider container={CoreDIContainer}>
        <CookieModal />
      </Provider>,
    );

    // Modal should be visible initially
    expect(result.getByTestId("cookieModal")).toBeInTheDocument();

    const declineButton = result.getByTestId("cookieDecline");
    fireEvent.click(declineButton);

    // Modal should close (not be in document anymore)
    expect(result.queryByTestId("cookieModal")).not.toBeInTheDocument();
  });
});
