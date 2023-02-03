import ScorePanelPresenter from "../../../../../Core/Presentation/React/SpaceDisplay/ScorePanel/ScorePanelPresenter";
import ScorePanelViewModel from "../../../../../Core/Presentation/React/SpaceDisplay/ScorePanel/ScorePanelViewModel";

describe("ScorePanelPresenter", () => {
  let systemUnderTest: ScorePanelPresenter;

  beforeEach(() => {
    systemUnderTest = new ScorePanelPresenter(new ScorePanelViewModel());
  });

  test("presentScore sets the score in the ViewModel", () => {
    systemUnderTest.onSpaceScored({
      currentScore: 1,
      requiredScore: 2,
      maxScore: 3,
      spaceID: 42,
    });

    expect(systemUnderTest["viewModel"].score.Value).toBe(1);
    expect(systemUnderTest["viewModel"].requiredScore.Value).toBe(2);
    expect(systemUnderTest["viewModel"].maxScore.Value).toBe(3);
  });
});
