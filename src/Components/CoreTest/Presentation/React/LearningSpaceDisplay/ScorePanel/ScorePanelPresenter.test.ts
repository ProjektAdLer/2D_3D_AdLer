import LearningSpaceTO from "../../../../../Core/Application/DataTransferObjects/LearningSpaceTO";
import ScorePanelPresenter from "../../../../../Core/Presentation/React/LearningSpaceDisplay/ScorePanel/ScorePanelPresenter";
import ScorePanelViewModel from "../../../../../Core/Presentation/React/LearningSpaceDisplay/ScorePanel/ScorePanelViewModel";

describe("ScorePanelPresenter", () => {
  let viewModel: ScorePanelViewModel;
  let systemUnderTest: ScorePanelPresenter;

  beforeEach(() => {
    viewModel = new ScorePanelViewModel();
    systemUnderTest = new ScorePanelPresenter(viewModel);
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
    systemUnderTest.onLearningWorldScored({
      currentScore: 4,
      requiredScore: 5,
      maxScore: 6,
    });

    expect(systemUnderTest["viewModel"].spaceScore.Value).toBe(1);
    expect(systemUnderTest["viewModel"].spaceRequiredScore.Value).toBe(2);
    expect(systemUnderTest["viewModel"].spaceMaxScore.Value).toBe(3);
    expect(systemUnderTest["viewModel"].worldScore.Value).toBe(4);
    expect(systemUnderTest["viewModel"].worldRequiredScore.Value).toBe(5);
    expect(systemUnderTest["viewModel"].worldMaxScore.Value).toBe(6);
  });
});
