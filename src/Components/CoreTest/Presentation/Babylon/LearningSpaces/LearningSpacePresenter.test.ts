import { Vector3 } from "@babylonjs/core";
import { mock } from "jest-mock-extended";
import LearningSpaceTO from "../../../../Core/Application/DataTransferObjects/LearningSpaceTO";
import BUILDER_TYPES from "../../../../Core/DependencyInjection/Builders/BUILDER_TYPES";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import ILearningWorldPort from "../../../../Core/Application/Ports/Interfaces/ILearningWorldPort";
import IDoorPresenter from "../../../../Core/Presentation/Babylon/Door/IDoorPresenter";
import LearningElementView from "../../../../Core/Presentation/Babylon/LearningElements/LearningElementView";
import ILearningElementPresenter from "../../../../Core/Presentation/Babylon/LearningElements/ILearningElementPresenter";
import LearningSpacePresenter from "../../../../Core/Presentation/Babylon/LearningSpaces/LearningSpacePresenter";
import LearningSpaceViewModel from "../../../../Core/Presentation/Babylon/LearningSpaces/LearningSpaceViewModel";
import IPresentationDirector from "../../../../Core/Presentation/PresentationBuilder/IPresentationDirector";
import { LearningSpaceTemplateType } from "../../../../Core/Domain/Types/LearningSpaceTemplateType";
import IWindowPresenter from "../../../../Core/Presentation/Babylon/Window/IWindowPresenter";
import IDecorationPresenter from "../../../../Core/Presentation/Babylon/Decoration/IDecorationPresenter";
import { LearningElementModelTypeEnums } from "../../../../Core/Domain/Types/LearningElementModelTypes";
import IAsyncPresentationBuilder from "../../../../Core/Presentation/PresentationBuilder/IAsyncPresentationBuilder";

const directorMock = mock<IPresentationDirector>();
const builderMock = mock<IAsyncPresentationBuilder>();
const worldPortMock = mock<ILearningWorldPort>();

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
      model: LearningElementModelTypeEnums.H5pElementModelTypes.Backboard,
    },
  ],
  requirementsSyntaxTree: null,
  isAvailable: true,
  template: LearningSpaceTemplateType.None,
};

const spaceViewModel: LearningSpaceViewModel = new LearningSpaceViewModel();
spaceViewModel.id = 1;

describe("LearningSpacePresenter", () => {
  let systemUnderTest: LearningSpacePresenter;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(
      BUILDER_TYPES.ILearningElementBuilder
    ).toConstantValue(builderMock);
    CoreDIContainer.rebind(
      BUILDER_TYPES.IStandInDecorationBuilder
    ).toConstantValue(builderMock);
    CoreDIContainer.rebind(BUILDER_TYPES.IDoorBuilder).toConstantValue(
      builderMock
    );
    CoreDIContainer.rebind(BUILDER_TYPES.IWindowBuilder).toConstantValue(
      builderMock
    );
    CoreDIContainer.rebind(BUILDER_TYPES.IDecorationBuilder).toConstantValue(
      builderMock
    );
    CoreDIContainer.rebind(
      BUILDER_TYPES.IStandInDecorationBuilder
    ).toConstantValue(builderMock);
    CoreDIContainer.rebind<IPresentationDirector>(
      BUILDER_TYPES.IPresentationDirector
    ).toConstantValue(directorMock);
    CoreDIContainer.rebind<ILearningWorldPort>(
      PORT_TYPES.ILearningWorldPort
    ).toConstantValue(worldPortMock);
  });

  beforeEach(() => {
    systemUnderTest = new LearningSpacePresenter(spaceViewModel);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("constructor throws error if viewModel is not defined", () => {
    expect(() => {
      // @ts-ignore
      new LearningSpacePresenter(undefined);
    }).toThrowError("ViewModel");
  });

  test("onLearningSpaceLoaded calls private subroutines", async () => {
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

  test("createLearningElements calls the director for one element and one standin decor", async () => {
    systemUnderTest["viewModel"].elementPositions = [
      [new Vector3(1, 1, 1), 0],
      [new Vector3(1, 1, 1), 0],
    ];

    await systemUnderTest["fillLearningElementSlots"](spaceTO);

    expect(directorMock.buildAsync).toHaveBeenCalledTimes(2);
    expect(directorMock.buildAsync).toHaveBeenCalledWith(builderMock);
  });

  test("createExitDoor creates a door with its builder and calls the new presenter", async () => {
    await systemUnderTest["createExitDoor"]();

    expect(directorMock.buildAsync).toHaveBeenCalledTimes(1);
    expect(directorMock.buildAsync).toHaveBeenCalledWith(builderMock);
  });

  test("createEntryDoor creates a door with its builder and calls the new presenter", async () => {
    await systemUnderTest["createEntryDoor"]();

    expect(directorMock.buildAsync).toHaveBeenCalledTimes(1);
    expect(directorMock.buildAsync).toHaveBeenCalledWith(builderMock);
  });

  test("createWindows creates windows with its builder and calls the new presenter", async () => {
    systemUnderTest["viewModel"].windowPositions = [
      [new Vector3(1, 1, 1), 0],
      [new Vector3(1, 1, 1), 0],
    ];

    await systemUnderTest["createWindows"]();

    expect(directorMock.buildAsync).toHaveBeenCalledTimes(2);
    expect(directorMock.buildAsync).toHaveBeenCalledWith(builderMock);
  });

  test("createDecoration creates Decoration with its builder and calls the new presenter", async () => {
    spaceViewModel.learningSpaceTemplateType = LearningSpaceTemplateType.L;

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
    builderMock.getPresenter.mockReturnValueOnce(decorationPresenterMock);

    await systemUnderTest["asyncSetupSpace"](spaceTO);

    expect(directorMock.buildAsync).toHaveBeenCalledTimes(1);
    expect(directorMock.buildAsync).toHaveBeenCalledWith(builderMock);
  });
});
