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
      const { container } = render(display.bottomTooltip(false));
      expect(screen.getByAltText("required")).toBeInTheDocument();
      expect(screen.queryByAltText("completed")).not.toBeInTheDocument();
      // Check for specific class names to ensure structure
      expect(container.firstChild).toHaveClass("relative inline-block mr-4");
    });

    test("should render required and completed icons when completed", () => {
      const { container } = render(display.bottomTooltip(true));
      expect(screen.getByAltText("required")).toBeInTheDocument();
      const completedIcon = screen.getByAltText("completed");
      expect(completedIcon).toBeInTheDocument();
      expect(completedIcon).toHaveClass(
        "absolute h-6 lg:h-9 top-0 lg:-top-3 -right-3 lg:-right-6",
      );
      expect(container.firstChild).toHaveClass("relative inline-block mr-4");
    });
  });

  describe("learningSpaceDetail", () => {
    const baseElement: LearningElementInfo = {
      id: "1",
      name: "Test Element",
      type: LearningElementTypes.text,
      hasScored: false,
      points: 0,
      resourceLink: "",
    };

    test("should render required icon when element has points and is not scored", () => {
      const element: LearningElementInfo = { ...baseElement, points: 10 };
      const { container } = render(display.learningSpaceDetail(element));
      expect(screen.getByAltText("required")).toBeInTheDocument();
      expect(screen.queryByAltText("completed")).not.toBeInTheDocument();
      expect(container.firstChild).toHaveClass("relative inline-block");
    });

    test("should render required and completed icons when element has points and is scored", () => {
      const element: LearningElementInfo = {
        ...baseElement,
        points: 10,
        hasScored: true,
      };
      const { container } = render(display.learningSpaceDetail(element));
      expect(screen.getByAltText("required")).toBeInTheDocument();
      const completedIcon = screen.getByAltText("completed");
      expect(completedIcon).toBeInTheDocument();
      expect(completedIcon).toHaveClass("absolute -top-1 -right-4 w-6");
      expect(container.firstChild).toHaveClass("relative inline-block");
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
});
