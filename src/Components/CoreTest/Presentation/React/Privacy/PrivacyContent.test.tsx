import React from "react";
import { render } from "@testing-library/react";
import PrivacyContent from "../../../../Core/Presentation/React/Privacy/PrivacyContent";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string, options?: { returnObjects?: boolean }) => {
      if (key === "sections" && options?.returnObjects) {
        return [
          {
            title: "Test Section",
            subsections: [
              {
                title: "Test Subsection",
                content: "Test content",
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
  test("should render", () => {
    const { container } = render(<PrivacyContent />);
    expect(container).toBeInTheDocument();
  });

  test("should render sections from translation", () => {
    const { getByText } = render(<PrivacyContent />);
    expect(getByText("Test Section")).toBeInTheDocument();
    expect(getByText("Test Subsection")).toBeInTheDocument();
    expect(getByText("Test content")).toBeInTheDocument();
  });

  test("should apply custom className", () => {
    const { container } = render(<PrivacyContent className="custom-class" />);
    const divElement = container.firstChild as HTMLElement;
    expect(divElement.className).toContain("custom-class");
  });
});
