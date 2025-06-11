import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PointBasedDisplay from "../../../Core/Presentation/Utils/ElementCompletionDisplay/PointBasedDisplay";
import { LearningElementInfo } from "../../../Core/Domain/Types/LearningElementInfo";
import { LearningElementTypes } from "../../../Core/Domain/Types/LearningElementTypes";

describe("PointBasedDisplay", () => {
  let display: PointBasedDisplay;

  beforeEach(() => {
    display = new PointBasedDisplay();
  });

  describe("bottomTooltip", () => {
    test("should render value and coin icon when value is a number", () => {
      const { container } = render(display.bottomTooltip(100));
      expect(screen.getByText("100")).toBeInTheDocument();
      const icon = screen.getByAltText(""); // Alt text is empty in component
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute("src", "coin.svg");
      expect(icon).toHaveClass("w-8");
      expect(container.firstChild).toHaveClass("flex items-center ml-2");
    });

    test("should render 'true' and coin icon when value is true", () => {
      const { container } = render(display.bottomTooltip(true));
      expect(screen.getByText("true")).toBeInTheDocument();
      const icon = screen.getByAltText("");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute("src", "coin.svg");
      expect(container.firstChild).toHaveClass("flex items-center ml-2");
    });

    test("should render 'false' and coin icon when value is false", () => {
      const { container } = render(display.bottomTooltip(false));
      expect(screen.getByText("false")).toBeInTheDocument();
      const icon = screen.getByAltText("");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute("src", "coin.svg");
      expect(container.firstChild).toHaveClass("flex items-center ml-2");
    });
  });

  describe("learningSpaceDetail", () => {
    const baseElement: LearningElementInfo = {
      name: "Test Element",
      type: LearningElementTypes.text,
      hasScored: false,
      points: 0, // Will be overridden in tests
      // isRequired can be true, false, or null. Setting to false for a default.
      isRequired: false,
    };

    test("should render '0/points' and coin icon when not scored", () => {
      const element: LearningElementInfo = { ...baseElement, points: 50 };
      render(display.learningSpaceDetail(element));
      expect(screen.getByText("0/50")).toBeInTheDocument();
      const icon = screen.getByAltText("Coin-Icon");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute("src", "coin.svg");
      expect(icon).toHaveClass("self-center w-6 ml-1 portrait:w-4 lg:w-8");
    });

    test("should render 'points/points' and coin icon when scored", () => {
      const element: LearningElementInfo = {
        ...baseElement,
        points: 75,
        hasScored: true,
      };
      render(display.learningSpaceDetail(element));
      expect(screen.getByText("75/75")).toBeInTheDocument();
      const icon = screen.getByAltText("Coin-Icon");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute("src", "coin.svg");
      expect(icon).toHaveClass("self-center w-6 ml-1 portrait:w-4 lg:w-8");
    });
  });
});
