import LearningSpaceTO from "../../../../../Core/Application/DataTransferObjects/LearningSpaceTO";
import LearningSpaceScorePanelPresenter from "../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningSpaceScorePanel/LearningSpaceScorePanelPresenter";
import LearningSpaceScorePanelViewModel from "../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningSpaceScorePanel/LearningSpaceScorePanelViewModel";

describe("LearningSpaceScorePanelPresenter", () => {
  let viewModel: LearningSpaceScorePanelViewModel;
  let systemUnderTest: LearningSpaceScorePanelPresenter;

  beforeEach(() => {
    viewModel = new LearningSpaceScorePanelViewModel();
    systemUnderTest = new LearningSpaceScorePanelPresenter(viewModel);
  });

  test("onLearningSpaceLoaded should set currentSpaceID", () => {
    systemUnderTest.onLearningSpaceLoaded({ id: 123 } as LearningSpaceTO);
    expect(viewModel.currentSpaceID.Value).toBe(123);
  });

  test("presentScore sets the score in the ViewModel", () => {
    viewModel.currentSpaceID.Value = 42;
    systemUnderTest.onLearningSpaceScored({
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
