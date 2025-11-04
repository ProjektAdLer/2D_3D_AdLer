import { fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";
import CookieModal from "../../../../../Core/Presentation/React/WelcomePage/CookieModal/CookieModal";
import ICookieModalController from "../../../../../Core/Presentation/React/WelcomePage/CookieModal/ICookieModalController";
import { Provider } from "inversify-react";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";
import { mock } from "jest-mock-extended";
import CookieModalViewModel from "../../../../../Core/Presentation/React/WelcomePage/CookieModal/CookieModalViewModel";
import CookieModalController from "../../../../../Core/Presentation/React/WelcomePage/CookieModal/CookieModalController";

describe("CookieModal", () => {
  let getConsentSpy: jest.SpyInstance;

  beforeEach(() => {
    getConsentSpy = jest.spyOn(CookieModalController, "getConsent");
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  test("should render", () => {
    const result = render(
      <Provider container={CoreDIContainer}>
        <CookieModal />
      </Provider>,
    );

    expect(result.getByTestId("cookieModal")).not.toBeEmptyDOMElement();
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

  test("click on decline button calls controller", () => {
    const mockedController = mock<ICookieModalController>();
    useBuilderMock([new CookieModalViewModel(), mockedController]);

    const result = render(
      <Provider container={CoreDIContainer}>
        <CookieModal />
      </Provider>,
    );

    fireEvent.click(result.getByTestId("cookieDecline"));

    expect(mockedController.decline).toBeCalledTimes(1);
  });

  test("click on accept button calls controller", () => {
    const mockedController = mock<ICookieModalController>();
    useBuilderMock([new CookieModalViewModel(), mockedController]);

    const result = render(
      <Provider container={CoreDIContainer}>
        <CookieModal />
      </Provider>,
    );

    fireEvent.click(result.getByTestId("cookieAcceptAll"));

    expect(mockedController.accept).toBeCalledTimes(1);
  });

  test("setShowModal to false after accept button click", async () => {
    const mockedController = mock<ICookieModalController>();
    useBuilderMock([new CookieModalViewModel(), mockedController]);

    const result = render(
      <Provider container={CoreDIContainer}>
        <CookieModal />
      </Provider>,
    );

    const acceptButton = result.getByTestId("cookieAcceptAll");
    fireEvent.click(acceptButton);

    // Controller should be called
    expect(mockedController.accept).toBeCalledTimes(1);
  });

  test("setShowModal to false after decline button click", async () => {
    const mockedController = mock<ICookieModalController>();
    useBuilderMock([new CookieModalViewModel(), mockedController]);

    const result = render(
      <Provider container={CoreDIContainer}>
        <CookieModal />
      </Provider>,
    );

    const declineButton = result.getByTestId("cookieDecline");
    fireEvent.click(declineButton);

    // Controller should be called
    expect(mockedController.decline).toBeCalledTimes(1);
  });

  test("modal doesn't show when consent already given (accepted)", async () => {
    getConsentSpy.mockReturnValue("accepted");

    const mockedController = mock<ICookieModalController>();
    useBuilderMock([new CookieModalViewModel(), mockedController]);

    const result = render(
      <Provider container={CoreDIContainer}>
        <CookieModal />
      </Provider>,
    );

    await waitFor(() => {
      expect(getConsentSpy).toHaveBeenCalled();
    });

    // Modal should not be visible when consent already given
    const modal = result.queryByTestId("cookieModal");
    expect(modal).not.toBeInTheDocument();
  });

  test("modal doesn't show when consent already declined", async () => {
    getConsentSpy.mockReturnValue("declined");

    const mockedController = mock<ICookieModalController>();
    useBuilderMock([new CookieModalViewModel(), mockedController]);

    const result = render(
      <Provider container={CoreDIContainer}>
        <CookieModal />
      </Provider>,
    );

    await waitFor(() => {
      expect(getConsentSpy).toHaveBeenCalled();
    });

    // Modal should not be visible when consent already declined
    const modal = result.queryByTestId("cookieModal");
    expect(modal).not.toBeInTheDocument();
  });

  test("modal shows when no consent is stored", async () => {
    getConsentSpy.mockReturnValue(null);

    const mockedController = mock<ICookieModalController>();
    useBuilderMock([new CookieModalViewModel(), mockedController]);

    const result = render(
      <Provider container={CoreDIContainer}>
        <CookieModal />
      </Provider>,
    );

    await waitFor(() => {
      expect(getConsentSpy).toHaveBeenCalled();
    });

    // Modal should be rendered when no consent is stored
    const modal = result.getByTestId("cookieModal");
    expect(modal).toBeInTheDocument();
  });
});
