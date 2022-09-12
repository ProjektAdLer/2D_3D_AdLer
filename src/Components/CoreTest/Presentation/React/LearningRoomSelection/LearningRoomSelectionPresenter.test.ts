import LearningWorldTO from "../../../../Core/Application/DataTransportObjects/LearningWorldTO";
import LearningRoomSelectionPresenter from "../../../../Core/Presentation/React/LearningRoomSelection/LearningRoomSelectionPresenter";
import LearningRoomSelectionViewModel from "../../../../Core/Presentation/React/LearningRoomSelection/LearningRoomSelectionViewModel";

describe("LearningRoomSelectionPresenter", () => {
  let systemUnderTest: LearningRoomSelectionPresenter;

  beforeEach(() => {
    systemUnderTest = new LearningRoomSelectionPresenter(
      new LearningRoomSelectionViewModel()
    );
  });

  test("onLearningWorldLoaded sets new values in the view model", () => {
    const learningWorldTO: LearningWorldTO = {
      worldName: "Test Learning World",
      worldGoal: "Test Learning World Goal",
      learningRooms: [
        {
          id: 1,
          name: "Test Learning Room 1",
          learningElements: [],
        },
        {
          id: 2,
          name: "Test Learning Room 2",
          learningElements: [],
        },
      ],
    };

    systemUnderTest.onLearningWorldLoaded(learningWorldTO);

    expect(systemUnderTest["viewModel"].learningRoomIDs.Value).toEqual([1, 2]);
    expect(systemUnderTest["viewModel"].learningRoomTitles.Value).toEqual([
      "Test Learning Room 1",
      "Test Learning Room 2",
    ]);
  });
});
