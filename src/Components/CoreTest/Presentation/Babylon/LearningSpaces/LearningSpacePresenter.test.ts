import { Vector3 } from "@babylonjs/core";
import { mock } from "jest-mock-extended";
import LearningSpaceScoreTO from "../../../../Core/Application/DataTransferObjects/LearningSpaceScoreTO";
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
import GenericLearningSpaceDimensionStrategy from "../../../../Core/Presentation/Babylon/LearningSpaces/LearningSpaceDimensionStrategies/GenericLearningSpaceDimensionStrategy";
import TemplateLearningSpaceDimensionStrategy from "../../../../Core/Presentation/Babylon/LearningSpaces/LearningSpaceDimensionStrategies/TemplateLearningSpaceDimensionStrategy";

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
      BUILDER_TYPES.IDoorBuilder
    ).toConstantValue(builderMock);
    CoreDIContainer.rebind<IPresentationBuilder>(
      BUILDER_TYPES.IWindowBuilder
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

  test("dispose calls unregisterAdapter on the LearningWorldPort", () => {
    systemUnderTest.dispose();

    expect(worldPortMock.unregisterAdapter).toHaveBeenCalledWith(
      systemUnderTest
    );
  });

  test("onLearningSpaceLoaded calls private subroutines", () => {
    // mock sub routines here, they are tested separately later
    const createElementsMock = jest.fn();
    systemUnderTest["createLearningElements"] = createElementsMock;
    const createExitDoorMock = jest.fn();
    systemUnderTest["createExitDoor"] = createExitDoorMock;
    const createEntryDoorMock = jest.fn();
    systemUnderTest["createEntryDoor"] = createEntryDoorMock;
    const createWindowsMock = jest.fn();
    systemUnderTest["createWindows"] = createWindowsMock;

    systemUnderTest.onLearningSpaceLoaded(spaceTO);

    expect(createElementsMock).toHaveBeenCalledTimes(1);
    expect(createExitDoorMock).toHaveBeenCalledTimes(1);
    expect(createWindowsMock).toHaveBeenCalledTimes(1);

    expect(createEntryDoorMock).toHaveBeenCalledTimes(1);
  });

  test("onLearningSpaceLoaded sets the space id in the ViewModel", () => {
    // mock sub routines here, they are tested separately later
    const createElementsMock = jest.fn();
    systemUnderTest["createLearningElements"] = createElementsMock;
    const createEntryDoorMock = jest.fn();
    systemUnderTest["createEntryDoor"] = createEntryDoorMock;
    const createExitDoorMock = jest.fn();
    systemUnderTest["createExitDoor"] = createExitDoorMock;
    const createWindowsMock = jest.fn();
    systemUnderTest["createWindows"] = createWindowsMock;

    systemUnderTest.onLearningSpaceLoaded(spaceTO);

    expect(systemUnderTest["viewModel"].id).toEqual(spaceTO.id);
  });

  test("setDimensionsStrategy sets the strategy to GenericLearningSpaceDimensionStrategy when the template type is None", () => {
    systemUnderTest["setDimensionsStrategy"](LearningSpaceTemplateType.None);

    expect(systemUnderTest["dimensionStrategy"]).toBeInstanceOf(
      GenericLearningSpaceDimensionStrategy
    );
  });

  test("setDimensionsStrategy sets the strategy to TemplateLearningSpaceDimensionStrategy when the template type is not None", () => {
    systemUnderTest["setDimensionsStrategy"](LearningSpaceTemplateType.L);

    expect(systemUnderTest["dimensionStrategy"]).toBeInstanceOf(
      TemplateLearningSpaceDimensionStrategy
    );
  });

  test("createLearningElements calls the builder for each Element", () => {
    const createEntryDoorMock = jest.fn();
    systemUnderTest["createEntryDoor"] = createEntryDoorMock;
    const createExitDoorMock = jest.fn();
    systemUnderTest["createExitEntryDoor"] = createExitDoorMock;
    const createWindowsMock = jest.fn();
    systemUnderTest["createWindows"] = createWindowsMock;

    builderMock.getPresenter.mockReturnValue(mock<ILearningElementPresenter>());
    builderMock.getView.mockReturnValue(mock<LearningElementView>());

    systemUnderTest.onLearningSpaceLoaded(spaceTO);

    expect(directorMock.build).toHaveBeenCalledTimes(2);
    expect(directorMock.build).toHaveBeenCalledWith(builderMock);
    expect(builderMock.reset).toHaveBeenCalledTimes(1);
  });

  test("createLearningElements calls the elementPresenter for each Element", () => {
    const createDoorMock = jest.fn();
    systemUnderTest["createDoor"] = createDoorMock;
    const createWindowsMock = jest.fn();
    systemUnderTest["createWindows"] = createWindowsMock;

    const elementPresenterMock = mock<ILearningElementPresenter>();
    builderMock.getPresenter.mockReturnValue(elementPresenterMock);
    builderMock.getView.mockReturnValue(mock<LearningElementView>());

    systemUnderTest.onLearningSpaceLoaded(spaceTO);

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

  test("createLearningElements calls the elementView for each Element", () => {
    const createDoorMock = jest.fn();
    systemUnderTest["createDoor"] = createDoorMock;
    const createWindowsMock = jest.fn();
    systemUnderTest["createWindows"] = createWindowsMock;

    builderMock.getPresenter.mockReturnValue(mock<ILearningElementPresenter>());
    const elementViewMock = mock<LearningElementView>();
    builderMock.getView.mockReturnValue(elementViewMock);

    systemUnderTest.onLearningSpaceLoaded(spaceTO);

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

  test("should open door, when winning score is presented", () => {
    const doorPresenterMock = mock<IDoorPresenter>();
    systemUnderTest["doorPresenter"] = doorPresenterMock;

    systemUnderTest["openDoor"] = jest.fn(systemUnderTest["openDoor"]);
    systemUnderTest.onLearningSpaceScored({
      currentScore: 42,
      maxScore: 42,
      requiredScore: 42,
      spaceID: 1,
    } as LearningSpaceScoreTO);
    expect(systemUnderTest["openDoor"]).toHaveBeenCalledTimes(1);
    expect(doorPresenterMock.openDoor).toHaveBeenCalledTimes(1);
  });

  test("should not open door, when winning score is presented but id is wrong", () => {
    systemUnderTest["openDoor"] = jest.fn();
    systemUnderTest.onLearningSpaceScored({
      currentScore: 42,
      maxScore: 42,
      requiredScore: 42,
      spaceID: 2,
    } as LearningSpaceScoreTO);
    expect(systemUnderTest["openDoor"]).toHaveBeenCalledTimes(0);
  });

  test("should not open door, when winning score is presented but presenter is not registred", () => {
    systemUnderTest["openDoor"] = jest.fn(systemUnderTest["openDoor"]);
    systemUnderTest.onLearningSpaceScored({
      currentScore: 42,
      maxScore: 42,
      requiredScore: 42,
      spaceID: 1,
    } as LearningSpaceScoreTO);
    expect(systemUnderTest["openDoor"]).toHaveBeenCalledTimes(1);
  });
});
