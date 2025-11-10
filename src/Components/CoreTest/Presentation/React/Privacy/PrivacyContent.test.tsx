import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import React from "react";
import PrivacyContent from "../../../../Core/Presentation/React/Privacy/PrivacyContent";
import PrivacyViewModel from "../../../../Core/Presentation/React/Privacy/PrivacyViewModel";
import IPrivacyController from "../../../../Core/Presentation/React/Privacy/IPrivacyController";
import useBuilderMock from "../ReactRelated/CustomHooks/useBuilder/useBuilderMock";
import { mock } from "jest-mock-extended";

// Mock react-i18next
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string, options?: any) => {
      if (key === "sections" && options?.returnObjects) {
        return [
          {
            title: "Test Section 1",
            subsections: [
              {
                title: "Subsection 1.1",
                content: "Content for subsection 1.1",
              },
              {
                title: "Subsection 1.2",
              },
            ],
          },
          {
            title: "Test Section 2",
            subsections: [
              {
                title: "Subsection 2.1",
                content: "Content for subsection 2.1",
              },
            ],
          },
        ];
      }
      return key;
    },
  }),
}));

describe("PrivacyContent", () => {
  let mockViewModel: PrivacyViewModel;
  let mockController: jest.Mocked<IPrivacyController>;

  beforeEach(() => {
    mockViewModel = new PrivacyViewModel();
    mockViewModel.cookiesAccepted.Value = false;
    mockController = mock<IPrivacyController>();
  });

  test("should render without controller", () => {
    useBuilderMock([mockViewModel, undefined]);
    const { container } = render(<PrivacyContent />);
    expect(container.firstChild).toBeNull();
  });

  test("should render without viewModel", () => {
    useBuilderMock([undefined, mockController]);
    const { container } = render(<PrivacyContent />);
    expect(container.firstChild).toBeNull();
  });

  test("should render privacy content sections", () => {
    useBuilderMock([mockViewModel, mockController]);
    const { getByText } = render(<PrivacyContent />);

    expect(getByText("Test Section 1")).toBeInTheDocument();
    expect(getByText("Test Section 2")).toBeInTheDocument();
    expect(getByText("Subsection 1.1")).toBeInTheDocument();
    expect(getByText("Content for subsection 1.1")).toBeInTheDocument();
  });

  test("should render cookie settings section", () => {
    useBuilderMock([mockViewModel, mockController]);
    const { getByText } = render(<PrivacyContent />);

    expect(getByText("cookieSettings")).toBeInTheDocument();
    expect(getByText("cookieSettingsButton")).toBeInTheDocument();
  });

  test("should show empty checkbox when cookies not accepted", () => {
    mockViewModel.cookiesAccepted.Value = false;
    useBuilderMock([mockViewModel, mockController]);
    const { getByTestId, queryByTestId } = render(<PrivacyContent />);

    expect(getByTestId("emptyBoxCookies")).toBeInTheDocument();
    expect(queryByTestId("checkMarkCookies")).not.toBeInTheDocument();
  });

  test("should show check mark when cookies accepted", () => {
    mockViewModel.cookiesAccepted.Value = true;
    useBuilderMock([mockViewModel, mockController]);
    const { getByTestId } = render(<PrivacyContent />);

    expect(getByTestId("emptyBoxCookies")).toBeInTheDocument();
    expect(getByTestId("checkMarkCookies")).toBeInTheDocument();
  });

  test("should call controller.setCookieConsent(true) when checkbox clicked and cookies not accepted", () => {
    mockViewModel.cookiesAccepted.Value = false;
    useBuilderMock([mockViewModel, mockController]);
    const { getByTestId } = render(<PrivacyContent />);

    const checkbox = getByTestId("emptyBoxCookies");
    fireEvent.click(checkbox);

    expect(mockController.setCookieConsent).toHaveBeenCalledWith(true);
  });

  test("should call controller.setCookieConsent(false) when checkbox clicked and cookies accepted", () => {
    mockViewModel.cookiesAccepted.Value = true;
    useBuilderMock([mockViewModel, mockController]);
    const { getByTestId } = render(<PrivacyContent />);

    const checkmark = getByTestId("checkMarkCookies");
    fireEvent.click(checkmark);

    expect(mockController.setCookieConsent).toHaveBeenCalledWith(false);
  });

  test("should call controller.setCookieConsent when text is clicked", () => {
    mockViewModel.cookiesAccepted.Value = false;
    useBuilderMock([mockViewModel, mockController]);
    const { getByText } = render(<PrivacyContent />);

    const text = getByText("cookieSettingsButton");
    fireEvent.click(text);

    expect(mockController.setCookieConsent).toHaveBeenCalledWith(true);
  });

  test("should render subsections without content correctly", () => {
    useBuilderMock([mockViewModel, mockController]);
    const { getByText, queryByText } = render(<PrivacyContent />);

    // Subsection 1.2 has no content
    expect(getByText("Subsection 1.2")).toBeInTheDocument();
    // Should not have any content text for it
    expect(queryByText("Content for subsection 1.2")).not.toBeInTheDocument();
  });

  test("should toggle cookie consent state", () => {
    mockViewModel.cookiesAccepted.Value = false;
    useBuilderMock([mockViewModel, mockController]);

    mockController.setCookieConsent.mockImplementation((accepted: boolean) => {
      mockViewModel.cookiesAccepted.Value = accepted;
    });

    const { getByTestId, queryByTestId, rerender } = render(<PrivacyContent />);

    // Initially not accepted
    expect(queryByTestId("checkMarkCookies")).not.toBeInTheDocument();

    // Click to accept
    const checkbox = getByTestId("emptyBoxCookies");
    fireEvent.click(checkbox);

    // Re-render with updated viewModel
    useBuilderMock([mockViewModel, mockController]);
    rerender(<PrivacyContent />);

    expect(getByTestId("checkMarkCookies")).toBeInTheDocument();
  });
});
