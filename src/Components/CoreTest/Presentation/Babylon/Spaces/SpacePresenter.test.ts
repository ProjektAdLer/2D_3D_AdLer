import { Vector3 } from "@babylonjs/core";
import { mock } from "jest-mock-extended";
import SpaceTO from "../../../../Core/Application/DataTransferObjects/SpaceTO";
import BUILDER_TYPES from "../../../../Core/DependencyInjection/Builders/BUILDER_TYPES";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import IDoorPresenter from "../../../../Core/Presentation/Babylon/Door/IDoorPresenter";
import IElementPresenter from "../../../../Core/Presentation/Babylon/Elements/IElementPresenter";
import SpacePresenter from "../../../../Core/Presentation/Babylon/Spaces/SpacePresenter";
import SpaceViewModel from "../../../../Core/Presentation/Babylon/Spaces/SpaceViewModel";
import IPresentationBuilder from "../../../../Core/Presentation/PresentationBuilder/IPresentationBuilder";
import IPresentationDirector from "../../../../Core/Presentation/PresentationBuilder/IPresentationDirector";

const directorMock = mock<IPresentationDirector>();
const builderMock = mock<IPresentationBuilder>();

const spaceTO: SpaceTO = {
  id: 1,
  description: "TestDescription",
  goals: "TestGoals",
  requirements: [],
  name: "TestSpace",
  elements: [
    {
      id: 2,
      name: "test",
      type: "h5p",
      description: "test",
      goals: "test",
      value: 42,
      parentSpaceId: 1,
    },
  ],
};

const spaceViewModel: SpaceViewModel = new SpaceViewModel();
spaceViewModel.id = 1;

describe("SpacePresenter", () => {
  let systemUnderTest: SpacePresenter;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind<IPresentationBuilder>(
      BUILDER_TYPES.IElementBuilder
    ).toConstantValue(builderMock);

    CoreDIContainer.rebind<IPresentationBuilder>(
      BUILDER_TYPES.IDoorBuilder
    ).toConstantValue(builderMock);

    CoreDIContainer.rebind<IPresentationDirector>(
      BUILDER_TYPES.IPresentationDirector
    ).toConstantValue(directorMock);
  });

  beforeEach(() => {
    systemUnderTest = new SpacePresenter(spaceViewModel);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("constructor throws error if viewModel is not defined", () => {
    expect(() => {
      // @ts-ignore
      new SpacePresenter(undefined);
    }).toThrowError("ViewModel");
  });

  test("SpaceId returns ID from viewModel", () => {
    expect(systemUnderTest.SpaceId).toBe(1);
  });

  test("nothing happens when the doorpresenter is not set and openDoor is called", () => {
    //@ts-ignore
    systemUnderTest["doorPresenter"] = undefined;
    expect(() => {
      systemUnderTest.openDoor();
    }).not.toThrow();
  });

  test("openDoor calls the doorPresenter", () => {
    const doorPresenterMock = mock<IDoorPresenter>();
    systemUnderTest["doorPresenter"] = doorPresenterMock;

    systemUnderTest.openDoor();

    expect(doorPresenterMock.openDoor).toHaveBeenCalledTimes(1);
  });

  test("presentSpace calls private subroutines", () => {
    // mock sub routines here, they are tested separately later
    const setViewModelDataMock = jest.fn();
    systemUnderTest["setViewModelData"] = setViewModelDataMock;
    const createElementsMock = jest.fn();
    systemUnderTest["createElements"] = createElementsMock;
    const createDoorMock = jest.fn();
    systemUnderTest["createDoor"] = createDoorMock;

    systemUnderTest.presentSpace(spaceTO);

    expect(setViewModelDataMock).toHaveBeenCalledTimes(1);
    expect(createElementsMock).toHaveBeenCalledTimes(1);
    expect(createDoorMock).toHaveBeenCalledTimes(1);
  });

  test("setViewModelData sets the space id in the ViewModel", () => {
    systemUnderTest["setViewModelData"](spaceTO);

    expect(systemUnderTest["viewModel"].id).toEqual(spaceTO.id);
  });

  test("setSpaceDimensions sets the space dimensions to array_length/2*4 length and 6 width for 1 Element", () => {
    systemUnderTest["setSpaceDimensions"](spaceTO);

    expect(systemUnderTest["viewModel"].spaceLength.Value).toEqual(
      (spaceTO.elements.length / 2) * 4
    );
    expect(systemUnderTest["viewModel"].spaceWidth.Value).toEqual(6);
  });

  test("setSpaceDimensions sets the space dimensions to array_length/2*4 length and 8 width for 2 or more Elements", () => {
    spaceTO.elements.push({
      id: 3,
      name: "test",
      description: "test",
      goals: "test",
      value: 42,
      type: "h5p",
      parentSpaceId: 1,
    });

    systemUnderTest["setSpaceDimensions"](spaceTO);

    expect(systemUnderTest["viewModel"].spaceLength.Value).toEqual(
      (spaceTO.elements.length / 2) * 4
    );
    expect(systemUnderTest["viewModel"].spaceWidth.Value).toEqual(8);
  });

  test("createElements calls the builder for each Element", () => {
    builderMock.getPresenter.mockReturnValue(mock<IElementPresenter>());

    systemUnderTest["createElements"](spaceTO.elements);

    expect(directorMock.build).toHaveBeenCalledTimes(spaceTO.elements.length);
    expect(directorMock.build).toHaveBeenCalledWith(builderMock);
    expect(builderMock.reset).toHaveBeenCalledTimes(spaceTO.elements.length);
  });

  test("createElements calls the elementPresenter for each Element", () => {
    const elementPresenterMock = mock<IElementPresenter>();
    builderMock.getPresenter.mockReturnValue(elementPresenterMock);

    systemUnderTest["createElements"](spaceTO.elements);

    expect(elementPresenterMock.presentElement).toHaveBeenCalledTimes(
      spaceTO.elements.length
    );

    // Expect the corresponding TO for each call
    // and any tuple of Vector3 and a number for the element position and rotation.
    // Method that creates positions/rotations is tested separately.
    for (let i = 0; i < spaceTO.elements.length; i++) {
      expect(elementPresenterMock.presentElement).toHaveBeenCalledWith(
        spaceTO.elements[i],
        [expect.any(Vector3), expect.any(Number)]
      );
    }
  });

  test.todo(
    "test element position/rotation calculation, when its well defined"
  );

  test("createDoor creates a door with its builder and calls the new presenter", () => {
    const doorPresenterMock = mock<IDoorPresenter>();
    builderMock.getPresenter.mockReturnValue(doorPresenterMock);

    systemUnderTest["createDoor"]();

    expect(directorMock.build).toHaveBeenCalledTimes(1);
    expect(directorMock.build).toHaveBeenCalledWith(builderMock);
    expect(doorPresenterMock.presentDoor).toHaveBeenCalledTimes(1);
  });

  test.todo("test door position/rotation calculation, when its well defined");
});
