import LearningSpaceTO from "../../../../../Core/Application/DataTransferObjects/LearningSpaceTO";
import { LearningSpaceTemplateType } from "../../../../../Core/Domain/Types/LearningSpaceTemplateType";
import LearningSpaceTemplateLookup from "../../../../../Core/Domain/LearningSpaceTemplates/LearningSpaceTemplatesLookup";
import TemplateLearningSpaceDimensionStrategy from "../../../../../Core/Presentation/Babylon/LearningSpaces/LearningSpaceDimensionStrategies/TemplateLearningSpaceDimensionStrategy";
import { Vector3 } from "@babylonjs/core";
import ILearningSpaceTemplate from "../../../../../Core/Domain/LearningSpaceTemplates/ILearningSpaceTemplate";

const mockSpaceTO: LearningSpaceTO = {
  id: 1,
  description: "",
  goals: [""],
  requirementsString: "",
  name: "TestSpace",
  requiredScore: 1,
  currentScore: 0,
  maxScore: 1,
  elements: [],
  requirementsSyntaxTree: null,
  isAvailable: true,
  template: LearningSpaceTemplateType.L,
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
const elementTOArray = [mockElementTO, null, mockElementTO];

const mockSpaceTemplate: ILearningSpaceTemplate = {
  name: LearningSpaceTemplateType.None,
  cornerPoints: [
    { x: 0, y: 0 },
    { x: 1, y: 1 },
    { x: 2, y: 2 },
    { x: 3, y: 3 },
  ],
  walls: [
    {
      start: 0,
      end: 1,
    },
    {
      start: 1,
      end: 2,
    },
  ],
  elementSlots: [
    { position: { x: 42, y: 42 }, orientation: { rotation: 42 } },
    { position: { x: 43, y: 43 }, orientation: { rotation: 43 } },
    { position: { x: 44, y: 44 }, orientation: { rotation: 44 } },
  ],
  entryDoor: { position: { x: 42, y: 42 }, orientation: { rotation: 42 } },
  exitDoor: { position: { x: 42, y: 42 }, orientation: { rotation: 42 } },
  windows: [{ position: { x: 42, y: 42 }, orientation: { rotation: 42 } }],
};

describe("TemplateLearningSpaceDimensionStrategy", () => {
  let systemUnderTest: TemplateLearningSpaceDimensionStrategy;

  beforeEach(() => {
    systemUnderTest = new TemplateLearningSpaceDimensionStrategy(1, 1, 1, 1);
  });

  test("getTemplateByType calls LearningSpaceTemplateLookup.getLearningSpaceTemplate with the correct type", () => {
    const getLearningSpaceTemplateMock = jest.spyOn(
      LearningSpaceTemplateLookup,
      "getLearningSpaceTemplate"
    );

    systemUnderTest["getTemplateByType"](LearningSpaceTemplateType.L);

    expect(getLearningSpaceTemplateMock).toHaveBeenCalledWith(
      LearningSpaceTemplateType.L
    );
  });

  test("getCornerPoints returns the correct corner points from the template", () => {
    jest
      .spyOn(LearningSpaceTemplateLookup, "getLearningSpaceTemplate")
      .mockReturnValue(mockSpaceTemplate);

    const cornerPoints = systemUnderTest["getCornerPoints"](mockSpaceTO);

    expect(cornerPoints).toHaveLength(4);
    expect(cornerPoints).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ _x: 0, _y: 0, _z: 0 }),
        expect.objectContaining({ _x: 1, _y: 0, _z: 1 }),
        expect.objectContaining({ _x: 2, _y: 0, _z: 2 }),
        expect.objectContaining({ _x: 3, _y: 0, _z: 3 }),
      ])
    );
  });

  test("getWallPoints returns the correct wall points from the template", () => {
    jest
      .spyOn(LearningSpaceTemplateLookup, "getLearningSpaceTemplate")
      .mockReturnValue(mockSpaceTemplate);

    const wallPoints = systemUnderTest["getWallSegmentIndices"](mockSpaceTO);

    expect(wallPoints).toEqual(mockSpaceTemplate.walls);
  });

  test("getLearningElementPositions returns the correct element slots from the template, skipping empty slots", () => {
    jest
      .spyOn(LearningSpaceTemplateLookup, "getLearningSpaceTemplate")
      .mockReturnValue(mockSpaceTemplate);

    const spaceTO = { ...mockSpaceTO, elements: elementTOArray };

    const elementPositions =
      systemUnderTest["getLearningElementPositions"](spaceTO);

    expect(elementPositions).toHaveLength(2);
    expect(elementPositions).toEqual(
      expect.arrayContaining([
        [expect.objectContaining({ _x: 42, _y: 1, _z: 42 }), 42],
        [expect.objectContaining({ _x: 44, _y: 1, _z: 44 }), 44],
      ])
    );
  });

  test("getEntryDoorPosition returns the correct entry door position from the template", () => {
    jest
      .spyOn(LearningSpaceTemplateLookup, "getLearningSpaceTemplate")
      .mockReturnValue(mockSpaceTemplate);

    const entryDoorPosition =
      systemUnderTest["getEntryDoorPosition"](mockSpaceTO);

    expect(entryDoorPosition).toEqual([
      expect.objectContaining({ _x: 42, _y: 1, _z: 42 }),
      42,
    ]);
  });

  test("getExitDoorPosition returns the correct exit door position from the template", () => {
    jest
      .spyOn(LearningSpaceTemplateLookup, "getLearningSpaceTemplate")
      .mockReturnValue(mockSpaceTemplate);

    const exitDoorPosition =
      systemUnderTest["getExitDoorPosition"](mockSpaceTO);

    expect(exitDoorPosition).toEqual([
      expect.objectContaining({ _x: 42, _y: 1, _z: 42 }),
      42,
    ]);
  });

  test("getWindowPositions returns the correct window positions from the template", () => {
    jest
      .spyOn(LearningSpaceTemplateLookup, "getLearningSpaceTemplate")
      .mockReturnValue(mockSpaceTemplate);

    const windowPositions = systemUnderTest["getWindowPositions"](mockSpaceTO);

    expect(windowPositions).toEqual(
      expect.arrayContaining([
        [expect.objectContaining({ _x: 42, _y: 1, _z: 42 }), 42],
      ])
    );
  });
});
