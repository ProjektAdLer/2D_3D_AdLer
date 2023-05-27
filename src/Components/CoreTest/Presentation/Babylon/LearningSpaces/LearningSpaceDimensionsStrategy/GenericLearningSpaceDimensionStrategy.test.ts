import { Vector3 } from "@babylonjs/core";
import LearningSpaceTO from "../../../../../Core/Application/DataTransferObjects/LearningSpaceTO";
import { LearningSpaceTemplateType } from "../../../../../Core/Domain/Types/LearningSpaceTemplateType";
import GenericLearningSpaceDimensionStrategy from "../../../../../Core/Presentation/Babylon/LearningSpaces/LearningSpaceDimensionStrategies/GenericLearningSpaceDimensionStrategy";

const mockSpaceTO: LearningSpaceTO = {
  id: 1,
  description: "TestDescription",
  goals: ["TestGoals"],
  requirementsString: "",
  name: "TestSpace",
  requiredScore: 1,
  currentScore: 0,
  maxScore: 0,
  elements: [],
  requirementsSyntaxTree: null,
  isAvailable: true,
  template: LearningSpaceTemplateType.None,
};

const mockElementTO = {
  id: 2,
  name: "test",
  type: "h5p",
  description: "test",
  goals: ["test"],
  value: 42,
  parentSpaceID: 1,
  hasScored: false,
  parentWorldID: 1,
};
const oneElementArray = [mockElementTO];
const twoElementArray = [mockElementTO, mockElementTO];

const anyExpectedVector3AndRotation = [expect.any(Vector3), expect.any(Number)];

describe("GenericLearningSpaceDimensionStrategy", () => {
  let systemUnderTest: GenericLearningSpaceDimensionStrategy;

  beforeEach(() => {
    systemUnderTest = new GenericLearningSpaceDimensionStrategy(1, 1, 1, 1);
  });

  test("calculateLengthWidth sets the space dimensions to array_length/2*4 length and 6 width for 1 Element", () => {
    const spaceTO = { ...mockSpaceTO, elements: oneElementArray };

    const { spaceWidth, spaceLength } =
      systemUnderTest["calculateLengthWidth"](spaceTO);

    expect(spaceLength).toEqual(2); // 1 element / 2 * 4 = 2
    expect(spaceWidth).toEqual(6);
  });

  test("calculateLengthWidth sets the space dimensions to array_length/2*4 length and 8 width for 2 or more Elements", () => {
    const spaceTO = { ...mockSpaceTO, elements: twoElementArray };

    const { spaceWidth, spaceLength } =
      systemUnderTest["calculateLengthWidth"](spaceTO);

    expect(spaceLength).toEqual(4); // 2 elements / 2 * 4 = 4
    expect(spaceWidth).toEqual(8);
  });

  test("getCornerPoints returns 4 points in the correct structure", () => {
    const cornerPoints = systemUnderTest["getCornerPoints"](mockSpaceTO);

    expect(cornerPoints.length).toEqual(4);
    expect(cornerPoints).toEqual(
      expect.arrayContaining([
        expect.any(Vector3),
        expect.any(Vector3),
        expect.any(Vector3),
        expect.any(Vector3),
      ])
    );
  });

  test("getLearningElementPositions returns 2 positions and rotations in the correct structure for 2 elements", () => {
    const spaceTO = { ...mockSpaceTO, elements: twoElementArray };

    const positions = systemUnderTest["getLearningElementPositions"](spaceTO);

    expect(positions.length).toEqual(2);
    expect(positions).toEqual(
      expect.arrayContaining([
        anyExpectedVector3AndRotation,
        anyExpectedVector3AndRotation,
      ])
    );
  });

  test("getEntryDoorPosition returns the position and rotation in correct structure", () => {
    const entryDoorPosition =
      systemUnderTest["getEntryDoorPosition"](mockSpaceTO);

    expect(entryDoorPosition).toEqual(anyExpectedVector3AndRotation);
  });

  test("getExitDoorPosition returns the position and rotation in correct structure", () => {
    const exitDoorPosition =
      systemUnderTest["getExitDoorPosition"](mockSpaceTO);

    expect(exitDoorPosition).toEqual(anyExpectedVector3AndRotation);
  });

  test("getWindowPositions returns positions and rotations in the correct structure", () => {
    const windowPositions = systemUnderTest["getWindowPositions"](mockSpaceTO);

    expect(windowPositions).toEqual(
      expect.arrayContaining([anyExpectedVector3AndRotation])
    );
  });
});
