import LearningRoomSelectionPresenter from "../../../../Core/Presentation/React/LearningRoomSelection/LearningRoomSelectionPresenter";
import LearningRoomSelectionViewModel from "../../../../Core/Presentation/React/LearningRoomSelection/LearningRoomSelectionViewModel";

describe("LearningRoomSelectionPresenter", () => {
  let systemUnderTest: LearningRoomSelectionPresenter;

  beforeEach(() => {
    systemUnderTest = new LearningRoomSelectionPresenter(
      new LearningRoomSelectionViewModel()
    );
  });

  test.todo("add tests, when the presenter is implemented");
});
