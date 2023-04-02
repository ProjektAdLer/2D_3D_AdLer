import LearningSpaceScoreTO from "../../../../../Core/Application/DataTransferObjects/LearningSpaceScoreTO";
import LearningSpaceCompletionModalPresenter from "../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningSpaceCompletionModal/LearningSpaceCompletionModalPresenter";
import LearningSpaceCompletionModalViewModel from "../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningSpaceCompletionModal/LearningSpaceCompletionModalViewModel";
import LearningSpaceTO from "../../../../../Core/Application/DataTransferObjects/LearningSpaceTO";

describe("SpaceCompletionModalPresenter", () => {
  let viewModel: LearningSpaceCompletionModalViewModel;
  let systemUnderTest: LearningSpaceCompletionModalPresenter;

  beforeEach(() => {
    viewModel = new LearningSpaceCompletionModalViewModel();
    systemUnderTest = new LearningSpaceCompletionModalPresenter(viewModel);
  });
  test("onLearningSpaceLoaded should set currentSpaceID", () => {
    systemUnderTest.onLearningSpaceLoaded({ id: 123 } as LearningSpaceTO);
    expect(viewModel.currentSpaceID.Value).toBe(123);
  });

  test("onLearningSpaceScored should set score in the viewmodel to the given score", () => {
    viewModel.currentSpaceID.Value = 0;
    systemUnderTest.onLearningSpaceScored({
      currentScore: 100,
      requiredScore: 0,
      maxScore: 0,
      spaceID: 0,
    } as LearningSpaceScoreTO);
    expect(viewModel.score.Value).toBe(100);
  });

  test("onLearningSpaceScored should set maxScore in the viewmodel to the given maxScore", () => {
    viewModel.currentSpaceID.Value = 0;
    systemUnderTest.onLearningSpaceScored({
      currentScore: 0,
      requiredScore: 0,
      maxScore: 100,
      spaceID: 0,
    } as LearningSpaceScoreTO);
    expect(viewModel.maxScore.Value).toBe(100);
  });

  test("onLearningSpaceScored should set requiredScore in the viewmodel to the given requiredScore", () => {
    viewModel.currentSpaceID.Value = 0;
    systemUnderTest.onLearningSpaceScored({
      currentScore: 0,
      requiredScore: 100,
      maxScore: 0,
      spaceID: 0,
    } as LearningSpaceScoreTO);
    expect(viewModel.requiredScore.Value).toBe(100);
  });

  test("onLearningSpaceScored should sets showModal to true if given score is bigger than requiredScore", () => {
    viewModel.currentSpaceID.Value = 0;
    viewModel.showModal.Value = false;
    systemUnderTest.onLearningSpaceScored({
      currentScore: 100,
      requiredScore: 99,
      maxScore: 0,
      spaceID: 0,
    } as LearningSpaceScoreTO);
    expect(viewModel.showModal.Value).toBe(true);
  });

  test("onLearningSpaceScored should sets showModal to true if given score is equal to requiredScore", () => {
    viewModel.currentSpaceID.Value = 0;
    viewModel.showModal.Value = false;
    systemUnderTest.onLearningSpaceScored({
      currentScore: 100,
      requiredScore: 100,
      maxScore: 0,
      spaceID: 0,
    } as LearningSpaceScoreTO);
    expect(viewModel.showModal.Value).toBe(true);
  });

  test("onLearningSpaceScored doesn't set showModal if given score is smaller than requiredScore", () => {
    viewModel.currentSpaceID.Value = 0;
    viewModel.showModal.Value = false;
    systemUnderTest.onLearningSpaceScored({
      currentScore: 100,
      requiredScore: 101,
      maxScore: 0,
      spaceID: 0,
    } as LearningSpaceScoreTO);
    expect(viewModel.showModal.Value).toBe(false);
  });
});
