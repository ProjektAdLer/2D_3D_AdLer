import SpaceTO from "../../../../../Core/Application/DataTransferObjects/SpaceTO";
import ScorePanelPresenter from "../../../../../Core/Presentation/React/SpaceDisplay/ScorePanel/ScorePanelPresenter";
import ScorePanelViewModel from "../../../../../Core/Presentation/React/SpaceDisplay/ScorePanel/ScorePanelViewModel";

describe("ScorePanelPresenter", () => {
  let viewModel: ScorePanelViewModel;
  let systemUnderTest: ScorePanelPresenter;

  beforeEach(() => {
    viewModel = new ScorePanelViewModel();
    systemUnderTest = new ScorePanelPresenter(viewModel);
  });

  test("onSpaceLoaded should set currentSpaceID", () => {
    systemUnderTest.onSpaceLoaded({ id: 123 } as SpaceTO);
    expect(viewModel.currentSpaceID.Value).toBe(123);
  });

  test("presentScore sets the score in the ViewModel", () => {
    viewModel.currentSpaceID.Value = 42;
    systemUnderTest.onSpaceScored({
      currentScore: 1,
      requiredScore: 2,
      maxScore: 3,
      spaceID: 42,
    });

    expect(systemUnderTest["viewModel"].spaceScore.Value).toBe(1);
    expect(systemUnderTest["viewModel"].spaceRequiredScore.Value).toBe(2);
    expect(systemUnderTest["viewModel"].spaceMaxScore.Value).toBe(3);
  });
});
