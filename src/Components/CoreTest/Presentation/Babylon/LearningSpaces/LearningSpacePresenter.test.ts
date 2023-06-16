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
import IPresentationBuilder from "../../../../Core/Presentation/PresentationBuilder/IPresentationBuilder";
import IPresentationDirector from "../../../../Core/Presentation/PresentationBuilder/IPresentationDirector";
import { LearningSpaceTemplateType } from "../../../../Core/Domain/Types/LearningSpaceTemplateType";
import IWindowPresenter from "../../../../Core/Presentation/Babylon/Window/IWindowPresenter";
import IDecorationPresenter from "../../../../Core/Presentation/Babylon/Decoration/IDecorationPresenter";
import { LearningElementModelTypeEnums } from "../../../../Core/Domain/Types/LearningElementModelTypes";

const directorMock = mock<IPresentationDirector>();
const builderMock = mock<IPresentationBuilder>();
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

    CoreDIContainer.rebind<IPresentationBuilder>(
      BUILDER_TYPES.ILearningElementBuilder
    ).toConstantValue(builderMock);
    CoreDIContainer.rebind<IPresentationBuilder>(
      BUILDER_TYPES.IStandInDecorationBuilder
    ).toConstantValue(builderMock);
    CoreDIContainer.rebind<IPresentationBuilder>(
      BUILDER_TYPES.IDoorBuilder
    ).toConstantValue(builderMock);
    CoreDIContainer.rebind<IPresentationBuilder>(
      BUILDER_TYPES.IWindowBuilder
    ).toConstantValue(builderMock);
    CoreDIContainer.rebind<IPresentationBuilder>(
      BUILDER_TYPES.IDecorationBuilder
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
    const createElementsMock = jest.fn();
    systemUnderTest["createLearningElements"] = createElementsMock;
    const createExitDoorMock = jest.fn();
    systemUnderTest["createExitDoor"] = createExitDoorMock;
    const createEntryDoorMock = jest.fn();
    systemUnderTest["createEntryDoor"] = createEntryDoorMock;
    const createWindowsMock = jest.fn();
    systemUnderTest["createWindows"] = createWindowsMock;
    const createDecorationMock = jest.fn();
    systemUnderTest["createDecoration"] = createDecorationMock;

    systemUnderTest["viewModel"].exitDoorPosition.Value = [
      new Vector3(1, 1, 1),
      0,
    ];
    systemUnderTest["viewModel"].entryDoorPosition.Value = [
      new Vector3(1, 1, 1),
      0,
    ];

    await systemUnderTest.asyncSetupSpace(spaceTO);

    expect(createElementsMock).toHaveBeenCalledTimes(1);
    expect(createExitDoorMock).toHaveBeenCalledTimes(1);
    expect(createEntryDoorMock).toHaveBeenCalledTimes(1);
    expect(createWindowsMock).toHaveBeenCalledTimes(1);
    expect(createDecorationMock).toHaveBeenCalledTimes(1);
  });

  test("createLearningElements calls the builder for each Element", async () => {
    const createEntryDoorMock = jest.fn();
    systemUnderTest["createEntryDoor"] = createEntryDoorMock;
    const createExitDoorMock = jest.fn();
    systemUnderTest["createExitEntryDoor"] = createExitDoorMock;
    const createWindowsMock = jest.fn();
    systemUnderTest["createWindows"] = createWindowsMock;
    const createDecorationMock = jest.fn();
    systemUnderTest["createDecoration"] = createDecorationMock;

    builderMock.getPresenter.mockReturnValue(mock<ILearningElementPresenter>());
    builderMock.getView.mockReturnValue(mock<LearningElementView>());

    systemUnderTest["viewModel"].elementPositions.Value = [
      [new Vector3(1, 1, 1), 0],
    ];

    await systemUnderTest.asyncSetupSpace(spaceTO);

    expect(directorMock.build).toHaveBeenCalledTimes(2);
    expect(directorMock.build).toHaveBeenCalledWith(builderMock);
    expect(builderMock.reset).toHaveBeenCalledTimes(2);
  });

  test("createLearningElements calls the elementPresenter for each Element", async () => {
    const createDoorMock = jest.fn();
    systemUnderTest["createDoor"] = createDoorMock;
    const createWindowsMock = jest.fn();
    systemUnderTest["createWindows"] = createWindowsMock;
    const createDecorationMock = jest.fn();
    systemUnderTest["createDecoration"] = createDecorationMock;

    const elementPresenterMock = mock<ILearningElementPresenter>();
    builderMock.getPresenter.mockReturnValue(elementPresenterMock);
    builderMock.getView.mockReturnValue(mock<LearningElementView>());

    await systemUnderTest.asyncSetupSpace(spaceTO);

    expect(elementPresenterMock.presentLearningElement).toHaveBeenCalledTimes(
      1
    );

    // Expect the corresponding TO for each call
    // and any tuple of Vector3 and a number for the element position and rotation.
    // Method that creates positions/rotations is tested separately.
    for (let i = 0; i < spaceTO.elements.length; i++) {
      if (spaceTO.elements[i] === null) continue;

      expect(elementPresenterMock.presentLearningElement).toHaveBeenCalledWith(
        spaceTO.elements[i],
        [expect.any(Vector3), expect.any(Number)]
      );
    }
  });

  test("createLearningElements calls the elementView for each Element", async () => {
    const createDoorMock = jest.fn();
    systemUnderTest["createDoor"] = createDoorMock;
    const createWindowsMock = jest.fn();
    systemUnderTest["createWindows"] = createWindowsMock;
    const createDecorationMock = jest.fn();
    systemUnderTest["createDecoration"] = createDecorationMock;

    builderMock.getPresenter.mockReturnValue(mock<ILearningElementPresenter>());
    const elementViewMock = mock<LearningElementView>();
    builderMock.getView.mockReturnValue(elementViewMock);

    await systemUnderTest.asyncSetupSpace(spaceTO);

    expect(elementViewMock.setupLearningElement).toHaveBeenCalledTimes(1);
  });

  test("createExitDoor creates a door with its builder and calls the new presenter", () => {
    const doorPresenterMock = mock<IDoorPresenter>();
    builderMock.getPresenter.mockReturnValueOnce(doorPresenterMock);

    systemUnderTest["createExitDoor"]();

    expect(directorMock.build).toHaveBeenCalledTimes(1);
    expect(directorMock.build).toHaveBeenCalledWith(builderMock);
    expect(doorPresenterMock.presentDoor).toHaveBeenCalledTimes(1);
  });

  test("createEntryDoor creates a door with its builder and calls the new presenter", () => {
    const doorPresenterMock = mock<IDoorPresenter>();
    builderMock.getPresenter.mockReturnValueOnce(doorPresenterMock);

    systemUnderTest["createEntryDoor"]();

    expect(directorMock.build).toHaveBeenCalledTimes(1);
    expect(directorMock.build).toHaveBeenCalledWith(builderMock);
    expect(doorPresenterMock.presentDoor).toHaveBeenCalledTimes(1);
  });

  test("createWindows creates windows with its builder and calls the new presenter", () => {
    const windowPresenterMock = mock<IWindowPresenter>();
    builderMock.getPresenter.mockReturnValueOnce(windowPresenterMock);

    systemUnderTest["createWindows"]();

    expect(directorMock.build).toHaveBeenCalledTimes(1);
    expect(directorMock.build).toHaveBeenCalledWith(builderMock);
    expect(windowPresenterMock.presentWindow).toHaveBeenCalledTimes(1);
  });

  test("createDecoration creates Decoration with its builder and calls the new presenter", () => {
    spaceViewModel.learningSpaceTemplateType.Value =
      LearningSpaceTemplateType.L;

    const decorationPresenterMock = mock<IDecorationPresenter>();
    builderMock.getPresenter.mockReturnValueOnce(decorationPresenterMock);

    systemUnderTest["createDecoration"]();

    expect(directorMock.build).toHaveBeenCalledTimes(1);
    expect(directorMock.build).toHaveBeenCalledWith(builderMock);
    expect(decorationPresenterMock.presentDecoration).toHaveBeenCalledTimes(1);
    expect(decorationPresenterMock.presentDecoration).toHaveBeenCalledWith(
      LearningSpaceTemplateType.L
    );
  });
});
