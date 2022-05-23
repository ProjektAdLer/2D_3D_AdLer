import { LearningRoomTO } from "../../../../Core/Application/LoadWorld/ILearningWorldPort";
import LearningElementBuilder from "../../../../Core/Presentation/Babylon/LearningElement/LearningElementBuilder";
import LearningElementPresenter from "../../../../Core/Presentation/Babylon/LearningElement/LearningElementPresenter";
import LearningRoomPresenter from "../../../../Core/Presentation/Babylon/LearningRoom/LearningRoomPresenter";
import LearningRoomViewModel from "../../../../Core/Presentation/Babylon/LearningRoom/LearningRoomViewModel";
import PresentationDirector from "../../../../Core/Presentation/PresentationBuilder/PresentationDirector";

var presentLearningElementMock = jest.spyOn(
  LearningElementPresenter.prototype,
  "presentLearningElement"
);
var getPresenterMock = jest.spyOn(
  LearningElementBuilder.prototype,
  "getPresenter"
);
// var buildMock = jest.spyOn(PresentationDirector.prototype, "build");

const roomTO: LearningRoomTO = {
  id: 1,
  learningElements: [
    {
      id: 2,
      type: "h5p",
    },
  ],
};

describe("LearningRoomPresenter", () => {
  let roomPresenter: LearningRoomPresenter;

  beforeEach(() => {
    roomPresenter = new LearningRoomPresenter(new LearningRoomViewModel());
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  test("constructor throws error if viewModel is not defined", () => {
    expect(() => {
      new LearningRoomPresenter(undefined);
    }).toThrowError("ViewModel");
  });

  test("presentLearningRoom sets room viewmodel", () => {
    roomPresenter.presentLearningRoom(roomTO);
    expect(roomPresenter["viewModel"].id).toBe(roomTO.id);
    // TODO: add additional expectations here for set viewmodel data
  });

  test("presentLearningRoom creates learning elements", () => {
    roomPresenter.presentLearningRoom(roomTO);
    expect(presentLearningElementMock).toHaveBeenCalledTimes(1);
    expect(getPresenterMock).toHaveBeenCalledTimes(1);
  });
});
