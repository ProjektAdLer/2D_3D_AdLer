import { fireEvent, render } from "@testing-library/react";
import React from "react";
import ExternalContentConsentBlocker from "../../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningElementModal/SubComponents/ExternalContentConsentBlocker";
import CookieModalController from "../../../../../../Core/Presentation/React/WelcomePage/CookieModal/CookieModalController";

// Mock the CookieModalController
jest.mock(
  "../../../../../../Core/Presentation/React/WelcomePage/CookieModal/CookieModalController",
);

// Mock react-i18next
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe("ExternalContentConsentBlocker", () => {
  let mockOnConsent: jest.Mock;

  beforeEach(() => {
    mockOnConsent = jest.fn();
    jest.clearAllMocks();
  });

  test("should render consent blocker UI", () => {
    const result = render(
      <ExternalContentConsentBlocker onConsent={mockOnConsent} />,
    );

    expect(
      result.getByTestId("external-content-consent-blocker"),
    ).toBeInTheDocument();
  });

  test("should display consent required heading", () => {
    const result = render(
      <ExternalContentConsentBlocker onConsent={mockOnConsent} />,
    );

    expect(
      result.getByText("externalContentConsentRequired"),
    ).toBeInTheDocument();
  });

  test("should display consent description", () => {
    const result = render(
      <ExternalContentConsentBlocker onConsent={mockOnConsent} />,
    );

    expect(
      result.getByText("externalContentConsentDescription"),
    ).toBeInTheDocument();
  });

  test("should toggle details visibility when clicking show/hide button", () => {
    const result = render(
      <ExternalContentConsentBlocker onConsent={mockOnConsent} />,
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

  test("should call CookieModalController.accept when accept button is clicked", () => {
    const mockAccept = jest.fn();
    (
      CookieModalController as jest.MockedClass<typeof CookieModalController>
    ).mockImplementation(() => ({
      accept: mockAccept,
      decline: jest.fn(),
    }));

    const result = render(
      <ExternalContentConsentBlocker onConsent={mockOnConsent} />,
    );

    const acceptButton = result.getByTestId("external-content-consent-accept");
    fireEvent.click(acceptButton);

    expect(mockAccept).toHaveBeenCalledTimes(1);
  });

  test("should call onConsent callback when accept button is clicked", () => {
    const mockAccept = jest.fn();
    (
      CookieModalController as jest.MockedClass<typeof CookieModalController>
    ).mockImplementation(() => ({
      accept: mockAccept,
      decline: jest.fn(),
    }));

    const result = render(
      <ExternalContentConsentBlocker onConsent={mockOnConsent} />,
    );

    const acceptButton = result.getByTestId("external-content-consent-accept");
    fireEvent.click(acceptButton);

    expect(mockOnConsent).toHaveBeenCalledTimes(1);
  });

  test("should display accept button with correct text", () => {
    const result = render(
      <ExternalContentConsentBlocker onConsent={mockOnConsent} />,
    );

    const acceptButton = result.getByTestId("external-content-consent-accept");
    expect(acceptButton).toHaveTextContent("externalContentConsentAccept");
  });

  test("should show 'show more' text initially", () => {
    const result = render(
      <ExternalContentConsentBlocker onConsent={mockOnConsent} />,
    );

    const toggleButton = result.getByTestId(
      "external-content-consent-details-toggle",
    );
    expect(toggleButton).toHaveTextContent("externalContentConsentShowDetails");
  });

  test("should show 'hide details' text when details are visible", () => {
    const result = render(
      <ExternalContentConsentBlocker onConsent={mockOnConsent} />,
    );

    const toggleButton = result.getByTestId(
      "external-content-consent-details-toggle",
    );

    fireEvent.click(toggleButton);

    expect(toggleButton).toHaveTextContent("externalContentConsentHideDetails");
  });
});
