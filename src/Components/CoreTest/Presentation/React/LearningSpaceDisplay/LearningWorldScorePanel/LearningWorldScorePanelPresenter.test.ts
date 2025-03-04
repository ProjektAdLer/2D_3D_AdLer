import LearningWorldScorePanelPresenter from "../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningWorldScorePanel/LearningWorldScorePanelPresenter";
import LearningWorldScorePanelViewModel from "../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningWorldScorePanel/LearningWorldScorePanelViewModel";

describe("LearningWorldScorePanelPresenter", () => {
  let viewModel: LearningWorldScorePanelViewModel;
  let systemUnderTest: LearningWorldScorePanelPresenter;

  beforeEach(() => {
    viewModel = new LearningWorldScorePanelViewModel();
    systemUnderTest = new LearningWorldScorePanelPresenter(viewModel);
  });

  // ANF-ID: [EWE0027]
  test("onLearningWorldScored sets the score in the ViewModel", () => {
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

  test("onLearningWorldEntityLoaded sets the score in the ViewModel", () => {
    systemUnderTest.onLearningWorldEntityLoaded({
      spaces: [
        {
          requiredScore: 5,
          elements: [
            { value: 1, hasScored: 1 },
            { value: 2, hasScored: 1 },
            { value: 3, hasScored: 1 },
          ],
        },
        {
          requiredScore: 10,
          elements: [
            { value: 1, hasScored: 1 },
            { value: 2, hasScored: 1 },
            { value: 3, hasScored: 1 },
          ],
        },
      ],
    });

    expect(systemUnderTest["viewModel"].scoreInfo.Value).toStrictEqual({
      currentScore: 12,
      requiredScore: 15,
      maxScore: 12,
    });
  });
});
