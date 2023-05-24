import LearningSpaceTO from "../../../../../Core/Application/DataTransferObjects/LearningSpaceTO";
import { LearningSpaceTemplateType } from "../../../../../Core/Domain/Types/LearningSpaceTemplateType";
import GenericLearningSpaceDimensionStrategy from "../../../../../Core/Presentation/Babylon/LearningSpaces/LearningSpaceDimensionStrategies/GenericLearningSpaceDimensionStrategy";

const spaceTO: LearningSpaceTO = {
  id: 1,
  description: "TestDescription",
  goals: ["TestGoals"],
  requirementsString: "",
  name: "TestSpace",
  requiredScore: 1,
  currentScore: 0,
  maxScore: 0,
  elements: [
    {
      id: 2,
      name: "test",
      type: "h5p",
      description: "test",
      goals: ["test"],
      value: 42,
      parentSpaceID: 1,
      hasScored: false,
      parentWorldID: 1,
    },
  ],
  requirementsSyntaxTree: null,
  isAvailable: true,
  template: LearningSpaceTemplateType.None,
};

describe("GenericLearningSpaceDimensionStrategy", () => {
  let systemUnderTest: GenericLearningSpaceDimensionStrategy;

  beforeEach(() => {
    systemUnderTest = new GenericLearningSpaceDimensionStrategy(1, 1, 1, 1);
  });

  test("calculateLengthWidth sets the space dimensions to array_length/2*4 length and 6 width for 1 Element", () => {
    const { spaceWidth, spaceLength } =
      systemUnderTest["calculateLengthWidth"](spaceTO);

    expect(spaceLength).toEqual(2); // 1 element / 2 * 4 = 2
    expect(spaceWidth).toEqual(6);
  });

  test("calculateLengthWidth sets the space dimensions to array_length/2*4 length and 8 width for 2 or more Elements", () => {
    spaceTO.elements.push({
      id: 3,
      name: "test",
      description: "test",
      goals: ["test"],
      value: 42,
      type: "h5p",
      parentSpaceID: 1,
      hasScored: false,
      parentWorldID: 1,
    });

    const { spaceWidth, spaceLength } =
      systemUnderTest["calculateLengthWidth"](spaceTO);

    expect(spaceLength).toEqual(4); // 2 elements / 2 * 4 = 4
    expect(spaceWidth).toEqual(8);
  });
});
