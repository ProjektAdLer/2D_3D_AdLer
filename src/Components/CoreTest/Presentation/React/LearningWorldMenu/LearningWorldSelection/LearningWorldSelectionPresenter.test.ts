import UserInitialLearningWorldsInfoTO from "../../../../../Core/Application/DataTransferObjects/UserInitialLearningWorldsInfoTO";
import LearningWorldSelectionPresenter from "../../../../../Core/Presentation/React/LearningWorldMenu/LearningWorldSelection/LearningWorldSelectionPresenter";
import LearningWorldSelectionViewModel from "../../../../../Core/Presentation/React/LearningWorldMenu/LearningWorldSelection/LearningWorldSelectionViewModel";

describe("LearningWorldSelectionPresenter", () => {
  let systemUnderTest: LearningWorldSelectionPresenter;

  beforeEach(() => {
    systemUnderTest = new LearningWorldSelectionPresenter(
      new LearningWorldSelectionViewModel()
    );
  });
  test("onUserInitialLearningWorldsInfoLoaded should set the correct values in the vm", () => {
    const userWorlds: UserInitialLearningWorldsInfoTO = {
      worldInfo: [
        { worldID: 1, worldName: "Test World 1" },
        { worldID: 2, worldName: "Test World 2" },
      ],
    };
    systemUnderTest.onUserInitialLearningWorldsInfoLoaded(userWorlds);
    expect(systemUnderTest["viewModel"].userWorlds.Value).toEqual([
      { id: 1, name: "Test World 1", isCompleted: false },
      { id: 2, name: "Test World 2", isCompleted: false },
    ]);
  });
});
