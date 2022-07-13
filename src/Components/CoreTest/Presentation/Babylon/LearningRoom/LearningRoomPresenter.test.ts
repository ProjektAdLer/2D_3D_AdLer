import { LearningRoomTO } from "../../../../Core/Application/LoadWorld/ILearningWorldPort";
import DoorPresenter from "../../../../Core/Presentation/Babylon/Door/DoorPresenter";
import DoorViewModel from "../../../../Core/Presentation/Babylon/Door/DoorViewModel";
import LearningElementBuilder from "../../../../Core/Presentation/Babylon/LearningElement/LearningElementBuilder";
import LearningElementPresenter from "../../../../Core/Presentation/Babylon/LearningElement/LearningElementPresenter";
import LearningRoomPresenter from "../../../../Core/Presentation/Babylon/LearningRoom/LearningRoomPresenter";
import LearningRoomViewModel from "../../../../Core/Presentation/Babylon/LearningRoom/LearningRoomViewModel";
import { mock } from "jest-mock-extended";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import ILearningElementPresenter from "../../../../Core/Presentation/Babylon/LearningElement/ILearningElementPresenter";
import IDoorPresenter from "../../../../Core/Presentation/Babylon/Door/IDoorPresenter";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import ILearningRoomView from "../../../../Core/Presentation/Babylon/LearningRoom/ILearningRoomView";

// const learningElementPresenterMock = jest.spyOn(
//   LearningElementPresenter.prototype,
//   "presentLearningElement"
// );
// const getPresenterMock = jest.spyOn(
//   LearningElementBuilder.prototype,
//   "getPresenter"
// );

const openDoorMock = jest.spyOn(DoorPresenter.prototype, "openDoor");

const roomViewModel: LearningRoomViewModel = new LearningRoomViewModel();
roomViewModel.id = 1;

const learningElementPresenterMock = mock<ILearningElementPresenter>();
// const learningElementBuilderMock = mock<LearningElementBuilder>();
const doorPresenterMock = mock<IDoorPresenter>();
const learningRoomViewMock = mock<ILearningRoomView>();

describe("LearningRoomPresenter", () => {
  let systemUnderTest: LearningRoomPresenter;
  let viewModel: LearningRoomViewModel;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    // CoreDIContainer.rebind(CORE_TYPES.ILearningRoomView).toConstantValue(
    //   learningRoomViewMock
    // );

    systemUnderTest = new LearningRoomPresenter(roomViewModel);
  });

  beforeEach(() => {
    viewModel = new LearningRoomViewModel();
    systemUnderTest = new LearningRoomPresenter(viewModel);
    // systemUnderTest = CoreDIContainer.resolve(LearningRoomPresenter);
  });

  afterAll(() => {
    jest.clearAllMocks();
    CoreDIContainer.restore();
  });

  test("constructor throws error if viewModel is not defined", () => {
    expect(() => {
      //@ts-ignore
      new LearningRoomPresenter(undefined);
    }).toThrowError("ViewModel");
  });

  test("LearningRoomId returns ID from viewModel", () => {
    viewModel.id = 1;
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
    const roomTO: LearningRoomTO = {
      id: 1,
      learningElements: [
        {
          id: 2,
          type: "h5p",
        },
      ],
    };
    systemUnderTest.presentLearningRoom(roomTO);
    //@ts-ignore
    expect(systemUnderTest.viewModel.id).toBe(roomTO.id);
    // TODO: add additional expectations here for set viewmodel data
  });

  test("presentLearningRoom creates learning elements", () => {
    systemUnderTest.presentLearningRoom(roomTO);
    expect(learningElementPresenterMock).toHaveBeenCalledTimes(1);
    expect(getPresenterMock).toHaveBeenCalledTimes(1);
  });
});
