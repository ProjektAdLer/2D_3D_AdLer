import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { LearningElementTypes } from "../../../Core/Domain/Types/LearningElementTypes";
import PointBasedDisplay from "../../../Core/Presentation/Utils/ElementCompletionDisplay/PointBasedDisplay";
import { LearningElementInfo } from "../../../Core/Domain/Types/LearningElementInfo";
// Remove the duplicate import of LearningElementTypes if it exists around here or elsewhere
describe("PointBasedDisplay", () => {
  let display: PointBasedDisplay;

  beforeEach(() => {
    display = new PointBasedDisplay();
  });

  describe("bottomTooltip", () => {
    test("should render value and coin icon when value is a number", () => {
      const { container } = render(
        display.bottomTooltip({
          points: 100,
          iconType: LearningElementTypes.h5p,
        }),
      );
      expect(screen.getByText("100")).toBeInTheDocument();
      const icon = screen.getByAltText("Points");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute("src", "coin.svg");
      expect(icon).toHaveClass("w-8");
      expect(container.firstChild).toHaveClass("flex items-center ml-2");
    });

    test("should not render 'true' text when points are not provided", () => {
      const { container } = render(
        display.bottomTooltip({
          iconType: LearningElementTypes.h5p,
          // Intentionally not providing points
        }),
      );
      expect(screen.queryByText("true")).not.toBeInTheDocument();
      // Further assertions might depend on whether an icon or container is rendered
    });

    test("should not render 'false' text when points are zero or not provided", () => {
      const { container } = render(
        display.bottomTooltip({
          points: 0, // or undefined
          iconType: LearningElementTypes.h5p,
        }),
      );
      expect(screen.queryByText("false")).not.toBeInTheDocument();
      // If 0 points are displayed as "0", this test would need adjustment.
      // Assuming "false" text is the key part of the original failing test.
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
