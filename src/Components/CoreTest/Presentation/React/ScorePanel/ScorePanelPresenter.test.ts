import ScorePanelPresenter from "../../../../Core/Presentation/React/ScorePanel/ScorePanelPresenter";
import ScorePanelViewModel from "../../../../Core/Presentation/React/ScorePanel/ScorePanelViewModel";

describe("ScorePanelPresenter", () => {
  let scorePanelPresenter: ScorePanelPresenter;

  beforeEach(() => {
    scorePanelPresenter = new ScorePanelPresenter(new ScorePanelViewModel());
  });

  test("presentScore sets the score in the ViewModel", () => {
    scorePanelPresenter.presentScore(420);

    expect(scorePanelPresenter["viewModel"].score.Value).toBe(420);
  });
});
