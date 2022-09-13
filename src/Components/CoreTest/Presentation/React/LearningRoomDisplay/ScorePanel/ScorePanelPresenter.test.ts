import ScorePanelPresenter from "../../../../../Core/Presentation/React/LearningRoomDisplay/ScorePanel/ScorePanelPresenter";
import ScorePanelViewModel from "../../../../../Core/Presentation/React/LearningRoomDisplay/ScorePanel/ScorePanelViewModel";

describe("ScorePanelPresenter", () => {
  let systemUnderTest: ScorePanelPresenter;

  beforeEach(() => {
    systemUnderTest = new ScorePanelPresenter(new ScorePanelViewModel());
  });

  test("presentScore sets the score in the ViewModel", () => {
    systemUnderTest.presentScore(420);

    expect(systemUnderTest["viewModel"].score.Value).toBe(420);
  });
});
