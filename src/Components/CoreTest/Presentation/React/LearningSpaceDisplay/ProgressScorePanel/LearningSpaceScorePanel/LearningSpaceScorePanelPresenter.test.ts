import LearningSpaceTO from "../../../../../../Core/Application/DataTransferObjects/LearningSpaceTO";
import LearningSpaceScorePanelPresenter from "../../../../../../Core/Presentation/React/LearningSpaceDisplay/ProgressScorePanel/LearningSpaceScorePanel/LearningSpaceScorePanelPresenter";
import LearningSpaceScorePanelViewModel from "../../../../../../Core/Presentation/React/LearningSpaceDisplay/ProgressScorePanel/LearningSpaceScorePanel/LearningSpaceScorePanelViewModel";

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

  // ANF-ID: [EWE0030]
  test("onLearningSpaceLoaded sets the score in the ViewModel", () => {
    viewModel.currentSpaceID.Value = 42;
    systemUnderTest.onLearningSpaceScored({
      currentScore: 1,
      requiredScore: 2,
      maxScore: 3,
      spaceID: 42,
    });

    expect(systemUnderTest["viewModel"].scoreInfo.Value).toStrictEqual({
      currentScore: 1,
      maxScore: 3,
      requiredScore: 2,
    });
  });
});
