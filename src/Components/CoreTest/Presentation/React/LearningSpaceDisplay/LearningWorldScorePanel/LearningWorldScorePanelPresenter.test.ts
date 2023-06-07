import LearningWorldScorePanelPresenter from "../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningWorldScorePanel/LearningWorldScorePanelPresenter";
import LearningWorldScorePanelViewModel from "../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningWorldScorePanel/LearningWorldScorePanelViewModel";

describe("LearningWorldScorePanelPresenter", () => {
  let viewModel: LearningWorldScorePanelViewModel;
  let systemUnderTest: LearningWorldScorePanelPresenter;

  beforeEach(() => {
    viewModel = new LearningWorldScorePanelViewModel();
    systemUnderTest = new LearningWorldScorePanelPresenter(viewModel);
  });

  test("presentScore sets the score in the ViewModel", () => {
    systemUnderTest.onLearningWorldScored({
      currentScore: 4,
      requiredScore: 5,
      maxScore: 6,
    });

    expect(systemUnderTest["viewModel"].scoreInfo.Value).toStrictEqual({
      currentScore: 4,
      requiredScore: 5,
      maxScore: 6,
    });
  });
});
