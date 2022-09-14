import LearningWorldTO from "../../../../../Core/Application/DataTransportObjects/LearningWorldTO";
import RoomSelectionSectionPresenter from "../../../../../Core/Presentation/React/RoomMenu/RoomSelectionSection/RoomSelectionSectionPresenter";
import RoomSelectionSectionViewModel from "../../../../../Core/Presentation/React/RoomMenu/RoomSelectionSection/RoomSelectionSectionViewModel";

describe("RoomSelectionSectionPresenter", () => {
  let systemUnderTest: RoomSelectionSectionPresenter;

  beforeEach(() => {
    systemUnderTest = new RoomSelectionSectionPresenter(
      new RoomSelectionSectionViewModel()
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

    expect(systemUnderTest["viewModel"].roomIDs.Value).toEqual([1, 2]);
    expect(systemUnderTest["viewModel"].roomTitles.Value).toEqual([
      "Test Learning Room 1",
      "Test Learning Room 2",
    ]);
  });
});
