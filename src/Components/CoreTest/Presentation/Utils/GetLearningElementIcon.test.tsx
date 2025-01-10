import { LearningElementTypeStrings } from "../../../Core/Domain/Types/LearningElementTypes";
import {
  getCheckIcon,
  getLearningElementIcon,
} from "../../../Core/Presentation/Utils/GetLearningElementIcon";

// Only smoketest here, because the only difference between the returned
// components is the path to the icon.
describe("GetLearningElementIcon should return a react component for valid element types", () => {
  test.each([
    ["text" as LearningElementTypeStrings, "text.svg"],
    ["image" as LearningElementTypeStrings, "image.svg"],
    ["video" as LearningElementTypeStrings, "video"],
    ["h5p" as LearningElementTypeStrings, "interactive-element.svg"],
    ["pdf" as LearningElementTypeStrings, "text"],
    ["adaptivity" as LearningElementTypeStrings, "quiz"],
  ])("should run for %s", (type, expected) => {
    const result = getLearningElementIcon(type);
    expect(result.props["src"]).toContain(expected);
  });

  test("should return default task icon, if no valid input is delivered", () => {
    const result = getLearningElementIcon("" as LearningElementTypeStrings);
    expect(result.props["src"]).toContain("learning-elements");
  });

  test("getCheckIcon returns a react component with a checkmark-image", () => {
    const result = getCheckIcon();
    expect(result.props["src"]).toContain("check");
  });
});
