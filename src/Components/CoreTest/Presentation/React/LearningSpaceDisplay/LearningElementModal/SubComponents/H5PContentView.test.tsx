import "@testing-library/jest-dom";
import { render, waitFor } from "@testing-library/react";
import LearningElementModalViewModel from "../../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningElementModal/LearningElementModalViewModel";
import H5PContent from "../../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningElementModal/SubComponents/H5PContent";
import React, { RefObject } from "react";
import CoreDIContainer from "../../../../../../Core/DependencyInjection/CoreDIContainer";
import mock from "jest-mock-extended/lib/Mock";
import { Provider } from "inversify-react";
import ILearningElementModalController from "../../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningElementModal/ILearningElementModalController";
import * as H5PUtils from "../../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningElementModal/SubComponents/H5pUtils";
import CookieModalController from "../../../../../../Core/Presentation/React/WelcomePage/CookieModal/CookieModalController";

jest.mock("h5p-standalone");

// Mock localStorage before anything else
const localStorageMock = (() => {
  let store: Record<string, string> = {
    adler_cookie_consent: "accepted",
  };

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = { adler_cookie_consent: "accepted" };
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

const ResizeObserverMock = mock<ResizeObserver>();
const elementModalControllerMock = mock<ILearningElementModalController>();

describe("H5PContentView", () => {
  window["H5P"] = {
    externalDispatcher: {
      on: () => {},
      off: () => {},
    },
  };
  window["H5PIntegration"] = {
    contents: {},
  };

  let viewModel: LearningElementModalViewModel;

  beforeEach(() => {
    viewModel = new LearningElementModalViewModel();
    viewModel.id.Value = 1;
    viewModel.parentWorldID.Value = 1;
    viewModel.filePath.Value =
      "wwwroot\\courses\\2\\World_For_Evaluation\\h5p\\H5P-SchiebeSpiel";
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  //ANF-ID: [ELG0030, EWE0037]
  test("should render", async () => {
    const { container } = render(
      <Provider container={CoreDIContainer}>
        <H5PContent
          viewModel={viewModel}
          controller={elementModalControllerMock}
        />
      </Provider>,
    );

    waitFor(() => {
      expect(container).not.toBeEmptyDOMElement();
    });
  });

  test("should be invisible if isVisible is false", () => {
    viewModel.isVisible.Value = false;

    const container = render(
      <Provider container={CoreDIContainer}>
        <H5PContent
          viewModel={viewModel}
          controller={elementModalControllerMock}
        />
      </Provider>,
    );

    const ref = container.getByTestId("h5pContent-testid");
    expect(ref.style.visibility).toEqual("hidden");
  });

  test("H5PContent calls getH5PContentSizeDecision", () => {
    viewModel.filePath.Value =
      "wwwroot\\courses\\2\\World_For_Evaluation\\h5p\\H5P-SchiebeSpiel";

    //mock getH5PDivs
    const element = document.createElement("div");
    element.style.width = "90vw";
    const reference = { current: element } as RefObject<HTMLDivElement>;
    jest
      .spyOn(H5PUtils, "getH5PDivs")
      .mockReturnValue({ ref: reference.current!, div: element });
    jest
      .spyOn(H5PUtils, "getH5PContentSizeDecision")
      .mockReturnValue({ resetContent: true, shrinkContent: false });

    ResizeObserverMock.observe(element);

    render(
      <Provider container={CoreDIContainer}>
        <H5PContent
          viewModel={viewModel}
          controller={elementModalControllerMock}
        />
      </Provider>,
    );

    waitFor(() => {
      expect(H5PUtils.getH5PContentSizeDecision).toHaveBeenCalled();
    });
  });
});
