import { LearningElementTypeStrings } from "../../../Core/Domain/Types/LearningElementTypes";
import { getLearningElementIcon } from "../../../Core/Presentation/Utils/GetLearningElementIcon";

// Only smoketest here, because the only idfference between the returned
// components is the path to the icon.
describe("GetLearningElementIcon should return a react component for valid element types", () => {
  test.each([
    ["text" as LearningElementTypeStrings, "text-icon"],
    ["image" as LearningElementTypeStrings, "image-icon"],
    ["video" as LearningElementTypeStrings, "video-icon"],
    ["h5p" as LearningElementTypeStrings, "h5p-icon"],
    ["pdf" as LearningElementTypeStrings, "text-icon"],
  ])("should run for %s", (type, expected) => {
    const result = getLearningElementIcon(type);
    expect(result.props["src"]).toContain(expected);
  });

  test("should return default task icon, if no valid input is delivered", () => {
    const result = getLearningElementIcon("" as LearningElementTypeStrings);
    expect(result.props["src"]).toContain("task-icon");
  });
});
