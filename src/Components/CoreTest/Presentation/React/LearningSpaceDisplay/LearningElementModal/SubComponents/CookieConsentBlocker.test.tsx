import { fireEvent, render } from "@testing-library/react";
import React from "react";
import CookieConsentBlocker from "../../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningElementModal/SubComponents/CookieConsentBlocker";
import type ILearningElementModalController from "../../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningElementModal/ILearningElementModalController";
import SettingsTO from "../../../../../../Core/Application/DataTransferObjects/SettingsTO";

// Mock react-i18next
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe("CookieConsentBlocker", () => {
  let mockOnConsent: jest.Mock;
  let mockController: jest.Mocked<ILearningElementModalController>;

  beforeEach(() => {
    mockOnConsent = jest.fn();
    mockController = {
      setUserSettings: jest.fn(),
    } as jest.Mocked<ILearningElementModalController>;
    jest.clearAllMocks();
  });

  test("should render consent blocker UI", () => {
    const result = render(
      <CookieConsentBlocker
        onConsent={mockOnConsent}
        controller={mockController}
      />,
    );

    expect(result.getByTestId("cookie-consent-blocker")).toBeInTheDocument();
  });

  test("should display consent required heading", () => {
    const result = render(
      <CookieConsentBlocker
        onConsent={mockOnConsent}
        controller={mockController}
      />,
    );

    expect(
      result.getByText("externalContentConsentRequired"),
    ).toBeInTheDocument();
  });

  test("should display consent description", () => {
    const result = render(
      <CookieConsentBlocker
        onConsent={mockOnConsent}
        controller={mockController}
      />,
    );

    expect(
      result.getByText("externalContentConsentDescription"),
    ).toBeInTheDocument();
  });

  test("should toggle details visibility when clicking show/hide button", () => {
    const result = render(
      <CookieConsentBlocker
        onConsent={mockOnConsent}
        controller={mockController}
      />,
    );

    const toggleButton = result.getByTestId(
      "external-content-consent-details-toggle",
    );

    // Initially, details should be hidden
    expect(
      result.queryByText("externalContentConsentDetailsTitle"),
    ).not.toBeInTheDocument();

    // Click to show details
    fireEvent.click(toggleButton);

    // Details should now be visible
    expect(
      result.getByText("externalContentConsentDetailsTitle"),
    ).toBeInTheDocument();
    expect(
      result.getByText("externalContentConsentDetail1"),
    ).toBeInTheDocument();
    expect(
      result.getByText("externalContentConsentDetail2"),
    ).toBeInTheDocument();

    // Click again to hide details
    fireEvent.click(toggleButton);

    // Details should be hidden again
    expect(
      result.queryByText("externalContentConsentDetailsTitle"),
    ).not.toBeInTheDocument();
  });

  test("should call controller.setUserSettings when accept button is clicked", () => {
    const result = render(
      <CookieConsentBlocker
        onConsent={mockOnConsent}
        controller={mockController}
      />,
    );

    const acceptButton = result.getByTestId("external-content-consent-accept");
    fireEvent.click(acceptButton);

    const expectedSettings = new SettingsTO();
    expectedSettings.cookieConsent = "accepted";
    expect(mockController.setUserSettings).toHaveBeenCalledWith(
      expectedSettings,
    );
  });

  test("should call onConsent callback when accept button is clicked", () => {
    const result = render(
      <CookieConsentBlocker
        onConsent={mockOnConsent}
        controller={mockController}
      />,
    );

    const acceptButton = result.getByTestId("external-content-consent-accept");
    fireEvent.click(acceptButton);

    expect(mockOnConsent).toHaveBeenCalledTimes(1);
  });

  test("should display accept button with correct text", () => {
    const result = render(
      <CookieConsentBlocker
        onConsent={mockOnConsent}
        controller={mockController}
      />,
    );

    const acceptButton = result.getByTestId("external-content-consent-accept");
    expect(acceptButton).toHaveTextContent("externalContentConsentAccept");
  });

  test("should show 'show more' text initially", () => {
    const result = render(
      <CookieConsentBlocker
        onConsent={mockOnConsent}
        controller={mockController}
      />,
    );

    const toggleButton = result.getByTestId(
      "external-content-consent-details-toggle",
    );
    expect(toggleButton).toHaveTextContent("externalContentConsentShowDetails");
  });

  test("should show 'hide details' text when details are visible", () => {
    const result = render(
      <CookieConsentBlocker
        onConsent={mockOnConsent}
        controller={mockController}
      />,
    );

    const toggleButton = result.getByTestId(
      "external-content-consent-details-toggle",
    );

    fireEvent.click(toggleButton);

    expect(toggleButton).toHaveTextContent("externalContentConsentHideDetails");
  });
});
