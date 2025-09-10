import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import RequirementBasedDisplay from "../../../Core/Presentation/Utils/ElementCompletionDisplay/RequirementBasedDisplay";
import { LearningElementInfo } from "../../../Core/Domain/Types/LearningElementInfo";
import { LearningElementTypes } from "../../../Core/Domain/Types/LearningElementTypes";

describe("RequirementBasedDisplay", () => {
  let display: RequirementBasedDisplay;

  beforeEach(() => {
    display = new RequirementBasedDisplay();
  });

  describe("bottomTooltip", () => {
    test("should render required icon when not completed", () => {
      const { container } = render(
        display.bottomTooltip({
          isRequired: true,
          hasScored: false,
          iconType: LearningElementTypes.h5p,
        }),
      );
      expect(screen.getByAltText("required")).toBeInTheDocument();
      expect(screen.queryByAltText("completed")).not.toBeInTheDocument();
      expect(container.firstChild?.firstChild).toHaveClass(
        "relative inline-block",
      );
    });

    test("should render required icon when completed", () => {
      render(
        display.bottomTooltip({
          isRequired: true,
          hasScored: true,
          iconType: LearningElementTypes.h5p,
        }),
      );
      expect(screen.getByAltText("required")).toBeInTheDocument();
      expect(screen.queryByAltText("completed")).not.toBeInTheDocument();
      const requiredIcon = screen.getByAltText("required");
      expect(requiredIcon.parentElement).toHaveClass("relative inline-block");
    });
  });

  describe("learningSpaceDetail", () => {
    const baseElement: LearningElementInfo = {
      name: "Test Element",
      type: LearningElementTypes.text,
      hasScored: false,
      points: 0,
      // isRequired can be true, false, or null.
      isRequired: false,
    };

    test("should render required icon when element has points and is not scored", () => {
      const element: LearningElementInfo = { ...baseElement, points: 10 };
      render(display.learningSpaceDetail(element));
      expect(screen.getByAltText("required")).toBeInTheDocument();
      expect(screen.queryByAltText("completed")).not.toBeInTheDocument();
      const requiredIcon = screen.getByAltText("required");
      expect(requiredIcon.parentElement).toHaveClass("relative inline-block");
    });

    test("should render required icon when element has points and is scored", () => {
      const element: LearningElementInfo = {
        ...baseElement,
        points: 10,
        hasScored: true,
      };
      render(display.learningSpaceDetail(element));
      expect(screen.getByAltText("required")).toBeInTheDocument();
      expect(screen.queryByAltText("completed")).not.toBeInTheDocument();
      const requiredIcon = screen.getByAltText("required");
      expect(requiredIcon.parentElement).toHaveClass("relative inline-block");
    });

    test("should render an empty fragment when element has no points", () => {
      const element: LearningElementInfo = { ...baseElement, points: 0 };
      const { container } = render(display.learningSpaceDetail(element));
      // Expect an empty container or a fragment that renders nothing visible
      expect(container).toBeEmptyDOMElement();
    });

    test("should render an empty fragment when element has no points even if scored", () => {
      const element: LearningElementInfo = {
        ...baseElement,
        points: 0,
        hasScored: true,
      };
      const { container } = render(display.learningSpaceDetail(element));
      expect(container).toBeEmptyDOMElement();
    });
  });
  describe("learningSpaceDetailSummary", () => {
    test("should render current and max XP correctly", () => {
      render(display.learningSpaceDetailSummary(50, "", 100, ""));
      expect(screen.getByText("50")).toBeInTheDocument();
      expect(screen.getByText("100")).toBeInTheDocument();
    });
  });
});
