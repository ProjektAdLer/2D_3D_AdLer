import ScorePanelPresenter from "../../../../../Core/Presentation/React/SpaceDisplay/ScorePanel/ScorePanelPresenter";
import ScorePanelViewModel from "../../../../../Core/Presentation/React/SpaceDisplay/ScorePanel/ScorePanelViewModel";

describe("ScorePanelPresenter", () => {
  let systemUnderTest: ScorePanelPresenter;

  beforeEach(() => {
    systemUnderTest = new ScorePanelPresenter(new ScorePanelViewModel());
  });

  test("presentScore sets the score in the ViewModel", () => {
    systemUnderTest.onScoreChanged(1, 2, 3);

    expect(systemUnderTest["viewModel"].score.Value).toBe(1);
    expect(systemUnderTest["viewModel"].requiredScore.Value).toBe(2);
    expect(systemUnderTest["viewModel"].maxScore.Value).toBe(3);
  });
});
