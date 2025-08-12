import { Vector3 } from "@babylonjs/core";
import { mock } from "jest-mock-extended";
import LearningSpaceTO from "../../../../Core/Application/DataTransferObjects/LearningSpaceTO";
import BUILDER_TYPES from "../../../../Core/DependencyInjection/Builders/BUILDER_TYPES";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import ILearningWorldPort from "../../../../Core/Application/Ports/Interfaces/ILearningWorldPort";
import LearningSpacePresenter from "../../../../Core/Presentation/Babylon/LearningSpaces/LearningSpacePresenter";
import LearningSpaceViewModel from "../../../../Core/Presentation/Babylon/LearningSpaces/LearningSpaceViewModel";
import IPresentationDirector from "../../../../Core/Presentation/PresentationBuilder/IPresentationDirector";
import { LearningSpaceTemplateType } from "../../../../Core/Domain/Types/LearningSpaceTemplateType";
import IDecorationPresenter from "../../../../Core/Presentation/Babylon/Decoration/IDecorationPresenter";
import DecorationBuilder from "../../../../Core/Presentation/Babylon/Decoration/DecorationBuilder";
import DoorBuilder from "../../../../Core/Presentation/Babylon/Door/DoorBuilder";
import WindowBuilder from "../../../../Core/Presentation/Babylon/Window/WindowBuilder";
import LearningElementBuilder from "../../../../Core/Presentation/Babylon/LearningElements/LearningElementBuilder";
import StandInDecorationBuilder from "../../../../Core/Presentation/Babylon/StandInDecoration/StandInDecorationBuilder";
import { ThemeType } from "../../../../Core/Domain/Types/ThemeTypes";
import SeededRNG from "../../../../Core/Presentation/Utils/SeededRNG";
import { LearningElementModelTypeEnums } from "../../../../Core/Domain/LearningElementModels/LearningElementModelTypes";
import IStoryNPCBuilder from "../../../../Core/Presentation/Babylon/StoryNPC/IStoryNPCBuilder";
import { StoryElementType } from "../../../../Core/Domain/Types/StoryElementType";
import StoryElementTO from "../../../../Core/Application/DataTransferObjects/StoryElementTO";

const directorMock = mock<IPresentationDirector>();
const decorationBuilderMock = mock<DecorationBuilder>();
const doorBuilderMock = mock<DoorBuilder>();
const windowBuilderMock = mock<WindowBuilder>();
const elementBuilderMock = mock<LearningElementBuilder>();
const standinBuilderMock = mock<StandInDecorationBuilder>();
const worldPortMock = mock<ILearningWorldPort>();
const storyNPCBuilderMock = mock<IStoryNPCBuilder>();

jest.mock("../../../../Core/Presentation/Utils/SeededRNG");

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
    null,
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
      model: LearningElementModelTypeEnums.H5pElementModelTypes.Blackboard,
      theme: ThemeType.Campus,
      isScoreable: true,
    },
  ],
  requirementsSyntaxTree: null,
  isAvailable: true,
  template: LearningSpaceTemplateType.L,
  theme: ThemeType.Campus,
  storyElements: [
    {
      introStoryTexts: null,
      outroStoryTexts: null,
      storyType: StoryElementType.None,
      modelType: null,
    } as StoryElementTO,
  ],
};

describe("LearningSpacePresenter", () => {
  let systemUnderTest: LearningSpacePresenter;
  let viewModel: LearningSpaceViewModel;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(
      BUILDER_TYPES.ILearningElementBuilder,
    ).toConstantValue(elementBuilderMock);
    CoreDIContainer.rebind(
      BUILDER_TYPES.IStandInDecorationBuilder,
    ).toConstantValue(standinBuilderMock);
    CoreDIContainer.rebind(BUILDER_TYPES.IDoorBuilder).toConstantValue(
      doorBuilderMock,
    );
    CoreDIContainer.rebind(BUILDER_TYPES.IWindowBuilder).toConstantValue(
      windowBuilderMock,
    );
    CoreDIContainer.rebind(BUILDER_TYPES.IDecorationBuilder).toConstantValue(
      decorationBuilderMock,
    );
    CoreDIContainer.rebind<IPresentationDirector>(
      BUILDER_TYPES.IPresentationDirector,
    ).toConstantValue(directorMock);
    CoreDIContainer.rebind<ILearningWorldPort>(
      PORT_TYPES.ILearningWorldPort,
    ).toConstantValue(worldPortMock);
    CoreDIContainer.rebind<IStoryNPCBuilder>(
      BUILDER_TYPES.IStoryNPCBuilder,
    ).toConstantValue(storyNPCBuilderMock);
  });

  beforeEach(() => {
    viewModel = new LearningSpaceViewModel();
    viewModel.id = 1;
    viewModel.wallSegments = [];
    systemUnderTest = new LearningSpacePresenter(viewModel);
  });

  afterAll(() => {
    CoreDIContainer.restore();
    jest.restoreAllMocks();
  });

  test("constructor throws error if viewModel is not defined", () => {
    expect(() => {
      // @ts-ignore
      new LearningSpacePresenter(undefined);
    }).toThrowError("ViewModel");
  });

  test("asyncSetupSpace calls private subroutines", async () => {
    // mock sub routines here, they are tested separately later
    const fillLearningElementSlotsMock = jest.fn();
    systemUnderTest["fillLearningElementSlots"] = fillLearningElementSlotsMock;
    const createExitDoorMock = jest.fn();
    systemUnderTest["createExitDoor"] = createExitDoorMock;
    const createEntryDoorMock = jest.fn();
    systemUnderTest["createEntryDoor"] = createEntryDoorMock;
    const createWindowsMock = jest.fn();
    systemUnderTest["createWindows"] = createWindowsMock;

    systemUnderTest["viewModel"].exitDoorPosition = [new Vector3(1, 1, 1), 0];
    systemUnderTest["viewModel"].entryDoorPosition = [new Vector3(1, 1, 1), 0];

    await systemUnderTest.asyncSetupSpace(spaceTO);

    expect(fillLearningElementSlotsMock).toHaveBeenCalledTimes(1);
    expect(createExitDoorMock).toHaveBeenCalledTimes(1);
    expect(createEntryDoorMock).toHaveBeenCalledTimes(1);
    expect(createWindowsMock).toHaveBeenCalledTimes(1);
  });

  test("asyncSetupSpace doens't create doors when no exit and entry door position is set", async () => {
    // mock sub routines here, they are tested separately later
    const fillLearningElementSlotsMock = jest.fn();
    systemUnderTest["fillLearningElementSlots"] = fillLearningElementSlotsMock;
    const createExitDoorMock = jest.fn();
    systemUnderTest["createExitDoor"] = createExitDoorMock;
    const createEntryDoorMock = jest.fn();
    systemUnderTest["createEntryDoor"] = createEntryDoorMock;
    const createWindowsMock = jest.fn();
    systemUnderTest["createWindows"] = createWindowsMock;

    await systemUnderTest.asyncSetupSpace(spaceTO);

    expect(createExitDoorMock).toHaveBeenCalledTimes(0);
    expect(createEntryDoorMock).toHaveBeenCalledTimes(0);
  });

  test("createDecoration creates Decoration with its builder and calls the new presenter", async () => {
    // mock sub routines here, they are tested separately later
    const fillLearningElementSlotsMock = jest.fn();
    systemUnderTest["fillLearningElementSlots"] = fillLearningElementSlotsMock;
    const createExitDoorMock = jest.fn();
    systemUnderTest["createExitDoor"] = createExitDoorMock;
    const createEntryDoorMock = jest.fn();
    systemUnderTest["createEntryDoor"] = createEntryDoorMock;
    const createWindowsMock = jest.fn();
    systemUnderTest["createWindows"] = createWindowsMock;

    const decorationPresenterMock = mock<IDecorationPresenter>();
    decorationBuilderMock.getPresenter.mockReturnValueOnce(
      decorationPresenterMock,
    );

    await systemUnderTest["asyncSetupSpace"](spaceTO);

    expect(decorationBuilderMock.spaceTemplate).toEqual(
      LearningSpaceTemplateType.L,
    );
    expect(directorMock.buildAsync).toHaveBeenCalledTimes(1);
    expect(directorMock.buildAsync).toHaveBeenCalledWith(decorationBuilderMock);
  });

  test("createLearningElements creates one element and sets the correct data in its builder", async () => {
    SeededRNG.prototype.seededRandom = jest.fn().mockReturnValue(0);

    systemUnderTest["viewModel"].elementPositions = [
      [new Vector3(1, 1, 1), 0],
      [new Vector3(1, 1, 1), 0],
    ];

    await systemUnderTest["fillLearningElementSlots"](spaceTO);

    expect(elementBuilderMock.elementData).toEqual(spaceTO.elements[1]);
    expect(elementBuilderMock.elementPosition).toEqual([
      new Vector3(1, 1, 1),
      0,
    ]);

    expect(directorMock.buildAsync).toHaveBeenCalledTimes(2);
    expect(directorMock.buildAsync).toHaveBeenNthCalledWith(
      2,
      elementBuilderMock,
    );
  });

  test("createLearningElements creates one standin deco and sets the correct data in its builder", async () => {
    SeededRNG.prototype.seededRandom = jest.fn().mockReturnValue(0);

    systemUnderTest["viewModel"].elementPositions = [
      [new Vector3(1, 1, 1), 0],
      [new Vector3(1, 1, 1), 0],
    ];

    await systemUnderTest["fillLearningElementSlots"](spaceTO);

    expect(standinBuilderMock.position).toEqual(new Vector3(1, 1, 1));
    expect(standinBuilderMock.rotation).toEqual(0);
    expect(standinBuilderMock.spaceName).toBe("TestSpace");
    expect(standinBuilderMock.slotNumber).toBe(0);

    expect(directorMock.buildAsync).toHaveBeenCalledTimes(2);
    expect(directorMock.buildAsync).toHaveBeenNthCalledWith(
      1,
      standinBuilderMock,
    );
  });

  // ANF-ID: [ELG0019]
  test("createExitDoor creates a door with its builder and calls the new presenter", async () => {
    systemUnderTest["viewModel"].exitDoorPosition = [new Vector3(1, 1, 1), 0];
    spaceTO.currentScore = 1;
    await systemUnderTest["createExitDoor"](spaceTO);

    expect(doorBuilderMock.position).toEqual(new Vector3(1, 1, 1));
    expect(doorBuilderMock.rotation).toEqual(0);
    expect(doorBuilderMock.spaceID).toBe(1);
    expect(doorBuilderMock.isExit).toBe(true);
    expect(doorBuilderMock.isOpen).toBe(true);

    expect(directorMock.buildAsync).toHaveBeenCalledTimes(1);
    expect(directorMock.buildAsync).toHaveBeenCalledWith(doorBuilderMock);
  });

  // ANF-ID: [ELG0019]
  test("createEntryDoor creates a door with its builder and calls the new presenter", async () => {
    systemUnderTest["viewModel"].entryDoorPosition = [new Vector3(2, 2, 2), 1];

    await systemUnderTest["createEntryDoor"]();

    expect(doorBuilderMock.position).toEqual(new Vector3(2, 2, 2));
    expect(doorBuilderMock.rotation).toEqual(1);
    expect(doorBuilderMock.spaceID).toBe(1);
    expect(doorBuilderMock.isExit).toBe(false);
    expect(doorBuilderMock.isOpen).toBe(true);

    expect(directorMock.buildAsync).toHaveBeenCalledTimes(1);
    expect(directorMock.buildAsync).toHaveBeenCalledWith(doorBuilderMock);
  });

  //ANF-ID: [ELG0020]
  test("createWindows creates windows with its builder and calls the new presenter", async () => {
    systemUnderTest["viewModel"].windowPositions = [
      [new Vector3(1, 1, 1), 0],
      [new Vector3(1, 1, 1), 0],
    ];

    await systemUnderTest["createWindows"]();

    expect(windowBuilderMock.position).toEqual(new Vector3(1, 1, 1));
    expect(windowBuilderMock.rotation).toEqual(0);

    expect(directorMock.buildAsync).toHaveBeenCalledTimes(2);
    expect(directorMock.buildAsync).toHaveBeenCalledWith(windowBuilderMock);
  });

  // ANF-ID: [EZZ0022]
  test("createStoryNPC creates a storyNPC with its builder when story element is available", async () => {
    await systemUnderTest["createStoryNPCs"]({
      ...spaceTO,
      storyElements: [
        {
          introStoryTexts: ["test"],
          outroStoryTexts: null,
          storyType: StoryElementType.Intro,
          modelType:
            LearningElementModelTypeEnums.QuizElementModelTypes.DefaultNPC,
        },
      ],
    });

    expect(directorMock.buildAsync).toHaveBeenCalledTimes(1);
    expect(directorMock.buildAsync).toHaveBeenCalledWith(storyNPCBuilderMock);

    expect(storyNPCBuilderMock.storyType).toBe(StoryElementType.Intro);
  });

  //ANF-ID: [ELG0016]
  test("computeWallCoordinates goes through all wallsegments and computes them correctly", async () => {
    systemUnderTest["viewModel"].wallSegments = [{ start: 0, end: 1 }];
    systemUnderTest["viewModel"].spaceCornerPoints = [
      new Vector3(0, 0, 1),
      new Vector3(1, 0, 1),
      new Vector3(1, 0, 2),
    ];
    systemUnderTest["computeWallCoordinates"]();

    expect(systemUnderTest["viewModel"].wallSegmentLocations).toEqual([
      {
        index: 0,
        startPoint: { x: 0, z: 1.15 },
        endPoint: { x: 1, z: 1.15 },
        angle: 0,
      },
    ]);
  });

  //ANF-ID: [ELG0016]
  test("computeWallCoordinates computes CornerPoles correctly", async () => {
    systemUnderTest["viewModel"].wallSegments = [
      { start: 0, end: 1 },
      { start: 1, end: 2 },
    ];
    systemUnderTest["viewModel"].spaceCornerPoints = [
      new Vector3(0, 0, 1),
      new Vector3(1, 0, 1),
      new Vector3(2, 0, 1),
      new Vector3(2, 0, 2),
    ];
    systemUnderTest["computeWallCoordinates"]();

    expect(systemUnderTest["viewModel"].cornerPoleLocations).toEqual([
      {
        index: 1,
        position: { x: 1, z: 1.225 },
      },
    ]);
  });

  //ANF-ID: [ELG0016]
  test("computeWallCoordinates computes CornerPoles correctly, even if Cornerpole is at index 0", async () => {
    systemUnderTest["viewModel"].wallSegments = [
      { start: 0, end: 1 },
      { start: 3, end: 0 },
    ];
    systemUnderTest["viewModel"].spaceCornerPoints = [
      new Vector3(0, 0, 1),
      new Vector3(1, 0, 1),
      new Vector3(-2, 0, 2),
      new Vector3(-1, 0, 1),
    ];
    systemUnderTest["computeWallCoordinates"]();

    expect(systemUnderTest["viewModel"].cornerPoleLocations).toEqual([
      {
        index: 0,
        position: { x: 0, z: 1.225 },
      },
    ]);
  });
});
