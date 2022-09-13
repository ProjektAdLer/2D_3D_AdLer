import LearningRoomDetailPresenter from "../../../../../Core/Presentation/React/LearningRoomMenu/LearningRoomDetail/LearningRoomDetailPresenter";
import LearningRoomDetailViewModel from "../../../../../Core/Presentation/React/LearningRoomMenu/LearningRoomDetail/LearningRoomDetailViewModel";
import LearningRoomTO from "../../../../../Core/Application/DataTransportObjects/LearningRoomTO";

describe("LearningRoomDetailPresenter", () => {
  let systemUnderTest: LearningRoomDetailPresenter;

  beforeEach(() => {
    systemUnderTest = new LearningRoomDetailPresenter(
      new LearningRoomDetailViewModel()
    );
  });

  test("onLearningRoomLoaded sets data in the view model", () => {
    const learningRoomTO: LearningRoomTO = {
      id: 42,
      name: "Test Learning Room",
      learningElements: [
        {
          id: 1,
          name: "Test Learning Element 1",
          learningElementData: {
            type: "h5p",
          },
        },
        {
          id: 2,
          name: "Test Learning Element 2",
          learningElementData: {
            type: "text",
          },
        },
      ],
    };

    systemUnderTest.onLearningRoomLoaded(learningRoomTO);

    expect(systemUnderTest["viewModel"].name.Value).toEqual(
      learningRoomTO.name
    );
    expect(systemUnderTest["viewModel"].learningElements.Value).toEqual([
      ["h5p", "Test Learning Element 1"],
      ["text", "Test Learning Element 2"],
    ]);
  });
});
