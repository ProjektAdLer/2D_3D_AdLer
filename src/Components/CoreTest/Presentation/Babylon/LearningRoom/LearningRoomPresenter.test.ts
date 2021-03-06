import { LearningRoomTO } from "../../../../Core/Ports/LearningWorldPort/ILearningWorldPort";
import DoorPresenter from "../../../../Core/Presentation/Babylon/Door/DoorPresenter";
import DoorViewModel from "../../../../Core/Presentation/Babylon/Door/DoorViewModel";
import LearningElementBuilder from "../../../../Core/Presentation/Babylon/LearningElement/LearningElementBuilder";
import LearningElementPresenter from "../../../../Core/Presentation/Babylon/LearningElement/LearningElementPresenter";
import LearningRoomPresenter from "../../../../Core/Presentation/Babylon/LearningRoom/LearningRoomPresenter";
import LearningRoomViewModel from "../../../../Core/Presentation/Babylon/LearningRoom/LearningRoomViewModel";

const presentLearningElementMock = jest.spyOn(
  LearningElementPresenter.prototype,
  "presentLearningElement"
);
const getPresenterMock = jest.spyOn(
  LearningElementBuilder.prototype,
  "getPresenter"
);
const openDoorMock = jest.spyOn(DoorPresenter.prototype, "openDoor");

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

  beforeEach(() => {
    systemUnderTest = new LearningRoomPresenter(roomViewModel);
  });

  afterAll(() => {
    jest.clearAllMocks();
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

  test("openDoor returns without calling the doorPresenter if its not defined", () => {
    systemUnderTest.openDoor();
    expect(openDoorMock).not.toHaveBeenCalled();
  });

  test("openDoor calls the doorPresenter", () => {
    systemUnderTest["doorPresenter"] = new DoorPresenter(new DoorViewModel());
    systemUnderTest.openDoor();
    expect(openDoorMock).toHaveBeenCalled();
  });

  test("presentLearningRoom sets room viewmodel", () => {
    systemUnderTest.presentLearningRoom(roomTO);
    expect(systemUnderTest["viewModel"].id).toBe(roomTO.id);
    // TODO: add additional expectations here for set viewmodel data
  });

  test("presentLearningRoom creates learning elements", () => {
    systemUnderTest.presentLearningRoom(roomTO);
    expect(presentLearningElementMock).toHaveBeenCalledTimes(1);
    expect(getPresenterMock).toHaveBeenCalledTimes(1);
  });
});
