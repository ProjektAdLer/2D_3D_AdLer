import { LearningElementTypeStrings } from "../../../Core/Domain/Types/LearningElementTypes";
import { getLearningElementIcon } from "../../../Core/Presentation/Utils/GetLearningElementIcon";

// Only smoketest here, because the only idfference between the returned
// components is the path to the icon.
describe("GetLearningElementIcon should return a react component for valid element types", () => {
  test.each([
    ["text" as LearningElementTypeStrings],
    ["image" as LearningElementTypeStrings],
    ["video" as LearningElementTypeStrings],
    ["h5p" as LearningElementTypeStrings],
  ])("should run for %s", (type) => {
    const result = getLearningElementIcon(type);
    if (type === "image")
      expect(result.props["src"]).toContain("image-icon.svg");
    else expect(result.props["src"]).toContain(type);
  });

  test("should return h5p, if no valid input is delivered", () => {
    const result = getLearningElementIcon("" as LearningElementTypeStrings);
    expect(result.props["src"]).toContain("h5p");
  });
});
