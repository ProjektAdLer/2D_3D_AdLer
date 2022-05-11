import { LearningRoomTO } from "../../../Core/Application/LoadWorld/ILearningWorldPort";
import LearningElementPresenter from "../../../Core/Presentation/Babylon/LearningElement/LearningElementPresenter";
import LearningRoomPresenter from "../../../Core/Presentation/Babylon/LearningRoom/LearningRoomPresenter";
import LearningRoomViewModel from "../../../Core/Presentation/Babylon/LearningRoom/LearningRoomViewModel";
import LearningElementBuilder from "../../../Core/Presentation/PresentationBuilder/LearningElementBuilder";

var presentLearningElementMock = jest.spyOn(
  LearningElementPresenter.prototype,
  "presentLearningElement"
);
var getPresenterMock = jest.spyOn(
  LearningElementBuilder.prototype,
  "getPresenter"
);
// var buildMock = jest.spyOn(PresentationDirector.prototype, "build");

describe("LearningRoomPresenter", () => {
  let roomPresenter: LearningRoomPresenter;

  beforeEach(() => {
    roomPresenter = new LearningRoomPresenter();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  test("presentLearningRoom throws error when viewmodel is not set", () => {
    expect(() => {
      roomPresenter.presentLearningRoom({
        id: "",
        learningElements: [],
      });
    }).toThrowError("ViewModel not set");
  });

  test("presentLearningRoom sets viewmodel data", () => {
    const viewModel = new LearningRoomViewModel();
    roomPresenter.ViewModel = viewModel;
    expect(roomPresenter["viewModel"]).toBe(viewModel);
  });

  test("presentLearningRoom sets room viewmodel", () => {
    const viewModel = new LearningRoomViewModel();
    roomPresenter.ViewModel = viewModel;

    const roomTO: LearningRoomTO = {
      id: "1",
      learningElements: [],
    };

    roomPresenter.presentLearningRoom(roomTO);
    expect(viewModel.id).toBe(roomTO.id);
    // TODO: add additional expectations here for set viewmodel data
  });

  test("presentLearningRoom creates learning elements", () => {
    const viewModel = new LearningRoomViewModel();
    roomPresenter.ViewModel = viewModel;
    roomPresenter.presentLearningRoom({
      id: "1",
      learningElements: [
        {
          id: "2",
          type: "h5p",
        },
      ],
    });
    // expect(buildMock).toHaveBeenCalledTimes(1);
    expect(presentLearningElementMock).toHaveBeenCalledTimes(1);
    expect(getPresenterMock).toHaveBeenCalledTimes(1);
  });
});
