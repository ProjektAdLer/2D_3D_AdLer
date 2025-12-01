import "@testing-library/jest-dom";
import { render, waitFor, act } from "@testing-library/react";
import LearningElementModalViewModel from "../../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningElementModal/LearningElementModalViewModel";
import PrimitiveH5PContent from "../../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningElementModal/SubComponents/PrimitiveH5PContent";
import React, { RefObject } from "react";
import CoreDIContainer from "../../../../../../Core/DependencyInjection/CoreDIContainer";
import { Provider } from "inversify-react";
import * as H5PUtils from "../../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningElementModal/SubComponents/H5pUtils";
import { mock } from "jest-mock-extended";
import type ILearningElementModalController from "../../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningElementModal/ILearningElementModalController";
import SettingsTO from "../../../../../../Core/Application/DataTransferObjects/SettingsTO";

const viewModel = new LearningElementModalViewModel();
viewModel.id.Value = 1;
viewModel.parentWorldID.Value = 1;

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

// Mock H5PIntegration global object for cleanup
(global as any).H5PIntegration = { contents: {} };

describe("PrimitiveH5PContent", () => {
  let mockController: jest.Mocked<ILearningElementModalController>;

  beforeAll(() => {
    CoreDIContainer.snapshot();
  });

  beforeEach(() => {
    mockController = mock<ILearningElementModalController>();
    const settings = new SettingsTO();
    settings.cookieConsent = "accepted";
    mockController.getUserSettings.mockReturnValue(settings);
  });

  afterAll(() => {
    CoreDIContainer.restore();
    jest.clearAllMocks();
  });

  //ANF-ID: [ELG0030, EWE0037]
  test("should render", () => {
    viewModel.filePath.Value =
      "wwwroot\\courses\\2\\World_For_Evaluation\\h5p\\H5P-SchiebeSpiel";

    const { container } = render(
      <PrimitiveH5PContent viewModel={viewModel} controller={mockController} />,
    );

    expect(container).not.toBeEmptyDOMElement();
  });

  test("should be invisible if isVisible is false", () => {
    viewModel.isVisible.Value = false;
    viewModel.cookieConsent.Value = "accepted"; // Set cookie consent in ViewModel

    const container = render(
      <Provider container={CoreDIContainer}>
        <PrimitiveH5PContent
          viewModel={viewModel}
          controller={mockController}
        />
      </Provider>,
    );

    const ref = container.getByTestId("primitiveH5pContent-testid");
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

    const { container } = render(
      <Provider container={CoreDIContainer}>
        <PrimitiveH5PContent
          viewModel={viewModel}
          controller={mockController}
        />
      </Provider>,
    );

    waitFor(() => {
      expect(H5PUtils.getH5PContentSizeDecision).toHaveBeenCalled();
    });
  });

  test("should show cookie consent blocker when user has not consented", () => {
    viewModel.filePath.Value =
      "wwwroot\\courses\\2\\World_For_Evaluation\\h5p\\H5P-Test";
    viewModel.cookieConsent.Value = "declined"; // Set cookie consent in ViewModel

    const settings = new SettingsTO();
    settings.cookieConsent = "declined";
    mockController.getUserSettings.mockReturnValue(settings);

    const { getByTestId } = render(
      <Provider container={CoreDIContainer}>
        <PrimitiveH5PContent
          viewModel={viewModel}
          controller={mockController}
        />
      </Provider>,
    );

    expect(getByTestId("cookie-consent-blocker")).toBeInTheDocument();
  });

  test("should show primitive H5P content when user has consented", () => {
    viewModel.filePath.Value =
      "wwwroot\\courses\\2\\World_For_Evaluation\\h5p\\H5P-Test";
    viewModel.cookieConsent.Value = "accepted"; // Set cookie consent in ViewModel

    const settings = new SettingsTO();
    settings.cookieConsent = "accepted";
    mockController.getUserSettings.mockReturnValue(settings);

    // Mock H5P utils to prevent errors
    const element = document.createElement("div");
    const reference = { current: element } as RefObject<HTMLDivElement>;
    jest
      .spyOn(H5PUtils, "getH5PDivs")
      .mockReturnValue({ ref: reference.current!, div: element });
    jest
      .spyOn(H5PUtils, "getH5PContentSizeDecision")
      .mockReturnValue({ resetContent: false, shrinkContent: false });

    const { queryByTestId, getByTestId } = render(
      <Provider container={CoreDIContainer}>
        <PrimitiveH5PContent
          viewModel={viewModel}
          controller={mockController}
        />
      </Provider>,
    );

    expect(queryByTestId("cookie-consent-blocker")).not.toBeInTheDocument();
    expect(getByTestId("primitiveH5pContent-testid")).toBeInTheDocument();
  });

  test("should show primitive H5P content after user accepts consent", async () => {
    viewModel.filePath.Value =
      "wwwroot\\courses\\2\\World_For_Evaluation\\h5p\\H5P-Test";
    viewModel.cookieConsent.Value = "declined"; // Set initial cookie consent in ViewModel

    const settings = new SettingsTO();
    settings.cookieConsent = "declined";
    mockController.getUserSettings.mockReturnValue(settings);

    // Mock setCookieConsent to update the ViewModel
    mockController.setCookieConsent.mockImplementation((accepted: boolean) => {
      viewModel.cookieConsent.Value = accepted ? "accepted" : "declined";
    });

    // Mock H5P utils to prevent errors
    const element = document.createElement("div");
    const reference = { current: element } as RefObject<HTMLDivElement>;
    jest
      .spyOn(H5PUtils, "getH5PDivs")
      .mockReturnValue({ ref: reference.current!, div: element });
    jest
      .spyOn(H5PUtils, "getH5PContentSizeDecision")
      .mockReturnValue({ resetContent: false, shrinkContent: false });

    const { getByTestId, queryByTestId } = render(
      <Provider container={CoreDIContainer}>
        <PrimitiveH5PContent
          viewModel={viewModel}
          controller={mockController}
        />
      </Provider>,
    );

    expect(getByTestId("cookie-consent-blocker")).toBeInTheDocument();

    // Simulate accepting consent
    const acceptButton = getByTestId("external-content-consent-accept");
    await act(async () => {
      acceptButton.click();
    });

    await waitFor(() => {
      expect(queryByTestId("cookie-consent-blocker")).not.toBeInTheDocument();
      expect(getByTestId("primitiveH5pContent-testid")).toBeInTheDocument();
    });
  });

  test("should not render primitive H5P player when consent is not given", () => {
    viewModel.filePath.Value =
      "wwwroot\\courses\\2\\World_For_Evaluation\\h5p\\H5P-Test";
    viewModel.cookieConsent.Value = "declined"; // Set cookie consent in ViewModel

    const settings = new SettingsTO();
    settings.cookieConsent = "declined";
    mockController.getUserSettings.mockReturnValue(settings);

    const { queryByTestId } = render(
      <Provider container={CoreDIContainer}>
        <PrimitiveH5PContent
          viewModel={viewModel}
          controller={mockController}
        />
      </Provider>,
    );

    expect(queryByTestId("primitiveH5pContent-testid")).not.toBeInTheDocument();
  });
});
