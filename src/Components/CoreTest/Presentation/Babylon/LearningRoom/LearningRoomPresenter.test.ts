import { Vector3 } from "@babylonjs/core";
import { mock } from "jest-mock-extended";
import BUILDER_TYPES from "../../../../Core/DependencyInjection/Builders/BUILDER_TYPES";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import { LearningRoomTO } from "../../../../Core/Ports/LearningWorldPort/ILearningWorldPort";
import IDoorPresenter from "../../../../Core/Presentation/Babylon/Door/IDoorPresenter";
import ILearningElementPresenter from "../../../../Core/Presentation/Babylon/LearningElement/ILearningElementPresenter";
import LearningRoomPresenter from "../../../../Core/Presentation/Babylon/LearningRoom/LearningRoomPresenter";
import LearningRoomViewModel from "../../../../Core/Presentation/Babylon/LearningRoom/LearningRoomViewModel";
import IPresentationBuilder from "../../../../Core/Presentation/PresentationBuilder/IPresentationBuilder";
import IPresentationDirector from "../../../../Core/Presentation/PresentationBuilder/IPresentationDirector";

const directorMock = mock<IPresentationDirector>();
const builderMock = mock<IPresentationBuilder>();

const roomTO: LearningRoomTO = {
  id: 1,
  learningElements: [
    {
      id: 2,
      name: "test",
      learningElementData: {
        type: "h5p",
      },
    },
  ],
};

const roomViewModel: LearningRoomViewModel = new LearningRoomViewModel();
roomViewModel.id = 1;

describe("LearningRoomPresenter", () => {
  let systemUnderTest: LearningRoomPresenter;

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
  });

  beforeEach(() => {
    systemUnderTest = new LearningRoomPresenter(roomViewModel);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("constructor throws error if viewModel is not defined", () => {
    expect(() => {
      // @ts-ignore
      new LearningRoomPresenter(undefined);
    }).toThrowError("ViewModel");
  });

  test("LearningRoomId returns ID from viewModel", () => {
    expect(systemUnderTest.LearningRoomId).toBe(1);
  });

  test("nothing happens when the doorpresenter not set and openDoor is called", () => {
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

  test("presentLearningRoom calls private subroutines", () => {
    // mock sub routines here, they are tested separately later
    const setViewModelDataMock = jest.fn();
    systemUnderTest["setViewModelData"] = setViewModelDataMock;
    const createLearningElementsMock = jest.fn();
    systemUnderTest["createLearningElements"] = createLearningElementsMock;
    const createDoorMock = jest.fn();
    systemUnderTest["createDoor"] = createDoorMock;

    systemUnderTest.presentLearningRoom(roomTO);

    expect(setViewModelDataMock).toHaveBeenCalledTimes(1);
    expect(createLearningElementsMock).toHaveBeenCalledTimes(1);
    expect(createDoorMock).toHaveBeenCalledTimes(1);
  });

  test("setViewModelData sets the room id in the ViewModel", () => {
    systemUnderTest["setViewModelData"](roomTO);

    expect(systemUnderTest["viewModel"].id).toEqual(roomTO.id);
  });

  test("setRoomDimensions sets the room dimensions to array_length/2*4 length and 6 width for 1 LearningElement", () => {
    systemUnderTest["setRoomDimensions"](roomTO);

    expect(systemUnderTest["viewModel"].roomLength.Value).toEqual(
      (roomTO.learningElements.length / 2) * 4
    );
    expect(systemUnderTest["viewModel"].roomWidth.Value).toEqual(6);
  });

  test("setRoomDimensions sets the room dimensions to array_length/2*4 length and 8 width for 2 or more LearningElements", () => {
    roomTO.learningElements.push({
      id: 3,
      name: "test",
      learningElementData: {
        type: "h5p",
      },
    });

    systemUnderTest["setRoomDimensions"](roomTO);

    expect(systemUnderTest["viewModel"].roomLength.Value).toEqual(
      (roomTO.learningElements.length / 2) * 4
    );
    expect(systemUnderTest["viewModel"].roomWidth.Value).toEqual(8);
  });

  test("createLearningElements calls the builder for each LearningElement", () => {
    builderMock.getPresenter.mockReturnValue(mock<ILearningElementPresenter>());

    systemUnderTest["createLearningElements"](roomTO.learningElements);

    expect(directorMock.build).toHaveBeenCalledTimes(
      roomTO.learningElements.length
    );
    expect(directorMock.build).toHaveBeenCalledWith(builderMock);
    expect(builderMock.reset).toHaveBeenCalledTimes(
      roomTO.learningElements.length
    );
  });

  test("createLearningElements calls the learningElementPresenter for each LearningElement", () => {
    const learningElementPresenterMock = mock<ILearningElementPresenter>();
    builderMock.getPresenter.mockReturnValue(learningElementPresenterMock);

    systemUnderTest["createLearningElements"](roomTO.learningElements);

    expect(
      learningElementPresenterMock.presentLearningElement
    ).toHaveBeenCalledTimes(roomTO.learningElements.length);

    // Expect the corresponding TO for each call
    // and any tuple of Vector3 and a number for the element position and rotation.
    // Method that creates positions/rotations is tested separately.
    for (let i = 0; i < roomTO.learningElements.length; i++) {
      expect(
        learningElementPresenterMock.presentLearningElement
      ).toHaveBeenCalledWith(roomTO.learningElements[i], [
        expect.any(Vector3),
        expect.any(Number),
      ]);
    }
  });

  test.todo(
    "test learning element position/rotation calculation, when its well defined"
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
