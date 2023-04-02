import UserLearningWorldsTO from "../../../../../Core/Application/DataTransferObjects/UserLearningWorldsTO";
import LearningWorldTO from "../../../../../Core/Application/DataTransferObjects/LearningWorldTO";
import LearningWorldSelectionPresenter from "../../../../../Core/Presentation/React/LearningWorldMenu/LearningWorldSelection/LearningWorldSelectionPresenter";
import LearningWorldSelectionViewModel from "../../../../../Core/Presentation/React/LearningWorldMenu/LearningWorldSelection/LearningWorldSelectionViewModel";

describe("LearningWorldSelectionPresenter", () => {
  let systemUnderTest: LearningWorldSelectionPresenter;

  beforeEach(() => {
    systemUnderTest = new LearningWorldSelectionPresenter(
      new LearningWorldSelectionViewModel()
    );
  });
  test("onUserLearningWorldsLoaded should set the correct values in the vm", () => {
    const userWorlds: UserLearningWorldsTO = {
      worldInfo: [
        { worldID: 1, worldName: "Test World 1" },
        { worldID: 2, worldName: "Test World 2" },
      ],
    };
    systemUnderTest.onUserLearningWorldsLoaded(userWorlds);
    expect(systemUnderTest["viewModel"].userWorlds.Value).toEqual([
      { id: 1, name: "Test World 1", isCompleted: false },
      { id: 2, name: "Test World 2", isCompleted: false },
    ]);
  });
});
