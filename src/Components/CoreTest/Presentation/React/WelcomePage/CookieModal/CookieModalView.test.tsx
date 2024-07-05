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
  });

  test("should render", () => {
    const result = render(
      <Provider container={CoreDIContainer}>
        <CookieModal />
      </Provider>
    );

    expect(result.getByTestId("cookieModal")).not.toBeEmptyDOMElement();
  });

  test("doesn't render without controller", () => {
    useBuilderMock([new CookieModalViewModel(), undefined]);

    const result = render(
      <Provider container={CoreDIContainer}>
        <CookieModal />
      </Provider>
    );

    expect(result.container.firstChild).toBeNull();
  });

  test("click on decline button calls controller", () => {
    const mockedController = mock<ICookieModalController>();
    useBuilderMock([new CookieModalViewModel(), mockedController]);

    const result = render(
      <Provider container={CoreDIContainer}>
        <CookieModal />
      </Provider>
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
      </Provider>
    );

    fireEvent.click(result.getByTestId("cookieAcceptAll"));

    expect(mockedController.accept).toBeCalledTimes(1);
  });
});
