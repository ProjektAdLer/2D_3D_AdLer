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
    const createDoorMock = jest.fn();
    systemUnderTest["createDoor"] = createDoorMock;
    const createWindowMock = jest.fn();
    systemUnderTest["createWindow"] = createWindowMock;

    systemUnderTest.onLearningSpaceLoaded(spaceTO);

    expect(createElementsMock).toHaveBeenCalledTimes(1);
    expect(createDoorMock).toHaveBeenCalledTimes(1);
    expect(createWindowMock).toHaveBeenCalledTimes(1);
  });

  test("onLearningSpaceLoaded sets the space id in the ViewModel", () => {
    // mock sub routines here, they are tested separately later
    const createElementsMock = jest.fn();
    systemUnderTest["createLearningElements"] = createElementsMock;
    const createDoorMock = jest.fn();
    systemUnderTest["createDoor"] = createDoorMock;
    const createWindowMock = jest.fn();
    systemUnderTest["createWindow"] = createWindowMock;

    systemUnderTest.onLearningSpaceLoaded(spaceTO);

    expect(systemUnderTest["viewModel"].id).toEqual(spaceTO.id);
  });

  test("createLearningElements calls the builder for each Element", () => {
    const createDoorMock = jest.fn();
    systemUnderTest["createDoor"] = createDoorMock;
    const createWindowMock = jest.fn();
    systemUnderTest["createWindow"] = createWindowMock;

    builderMock.getPresenter.mockReturnValue(mock<ILearningElementPresenter>());
    builderMock.getView.mockReturnValue(mock<LearningElementView>());

    systemUnderTest.onLearningSpaceLoaded(spaceTO);

    expect(directorMock.build).toHaveBeenCalledTimes(spaceTO.elements.length);
    expect(directorMock.build).toHaveBeenCalledWith(builderMock);
    expect(builderMock.reset).toHaveBeenCalledTimes(spaceTO.elements.length);
  });

  test("createLearningElements calls the elementPresenter for each Element", () => {
    const createDoorMock = jest.fn();
    systemUnderTest["createDoor"] = createDoorMock;
    const createWindowMock = jest.fn();
    systemUnderTest["createWindow"] = createWindowMock;

    const elementPresenterMock = mock<ILearningElementPresenter>();
    builderMock.getPresenter.mockReturnValue(elementPresenterMock);
    builderMock.getView.mockReturnValue(mock<LearningElementView>());

    systemUnderTest.onLearningSpaceLoaded(spaceTO);

    expect(elementPresenterMock.presentLearningElement).toHaveBeenCalledTimes(
      spaceTO.elements.length
    );

    // Expect the corresponding TO for each call
    // and any tuple of Vector3 and a number for the element position and rotation.
    // Method that creates positions/rotations is tested separately.
    for (let i = 0; i < spaceTO.elements.length; i++) {
      expect(elementPresenterMock.presentLearningElement).toHaveBeenCalledWith(
        spaceTO.elements[i],
        [expect.any(Vector3), expect.any(Number)]
      );
    }
  });

  test("createLearningElements calls the elementView for each Element", () => {
    const createDoorMock = jest.fn();
    systemUnderTest["createDoor"] = createDoorMock;
    const createWindowMock = jest.fn();
    systemUnderTest["createWindow"] = createWindowMock;

    builderMock.getPresenter.mockReturnValue(mock<ILearningElementPresenter>());
    const elementViewMock = mock<LearningElementView>();
    builderMock.getView.mockReturnValue(elementViewMock);

    systemUnderTest.onLearningSpaceLoaded(spaceTO);

    expect(elementViewMock.setupLearningElement).toHaveBeenCalledTimes(
      spaceTO.elements.length
    );
  });

  test("createDoor creates a door with its builder and calls the new presenter", () => {
    const doorPresenterMock = mock<IDoorPresenter>();
    builderMock.getPresenter.mockReturnValue(doorPresenterMock);

    systemUnderTest["createDoor"]();

    expect(directorMock.build).toHaveBeenCalledTimes(1);
    expect(directorMock.build).toHaveBeenCalledWith(builderMock);
    expect(doorPresenterMock.presentDoor).toHaveBeenCalledTimes(1);
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
