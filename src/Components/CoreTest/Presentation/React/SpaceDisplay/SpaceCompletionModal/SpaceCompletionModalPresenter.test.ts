import SpaceScoreTO from "../../../../../Core/Application/DataTransferObjects/SpaceScoreTO";
import SpaceCompletionModalPresenter from "../../../../../Core/Presentation/React/SpaceDisplay/SpaceCompletionModal/SpaceCompletionModalPresenter";
import SpaceCompletionModalViewModel from "../../../../../Core/Presentation/React/SpaceDisplay/SpaceCompletionModal/SpaceCompletionModalViewModel";

describe("SpaceCompletionModalPresenter", () => {
  let viewModel: SpaceCompletionModalViewModel;
  let systemUnderTest: SpaceCompletionModalPresenter;

  beforeEach(() => {
    viewModel = new SpaceCompletionModalViewModel();
    systemUnderTest = new SpaceCompletionModalPresenter(viewModel);
  });

  test("onSpaceScored should set score in the viewmodel to the given score", () => {
    systemUnderTest.onSpaceScored({
      currentScore: 100,
      requiredScore: 0,
      maxScore: 0,
      spaceID: 0,
    } as SpaceScoreTO);
    expect(viewModel.score.Value).toBe(100);
  });

  test("onSpaceScored should set maxScore in the viewmodel to the given maxScore", () => {
    systemUnderTest.onSpaceScored({
      currentScore: 0,
      requiredScore: 0,
      maxScore: 100,
      spaceID: 0,
    } as SpaceScoreTO);
    expect(viewModel.maxScore.Value).toBe(100);
  });

  test("onSpaceScored should set requiredScore in the viewmodel to the given requiredScore", () => {
    systemUnderTest.onSpaceScored({
      currentScore: 0,
      requiredScore: 100,
      maxScore: 0,
      spaceID: 0,
    } as SpaceScoreTO);
    expect(viewModel.requiredScore.Value).toBe(100);
  });

  test("onSpaceScored should sets showModal to true if given score is bigger than requiredScore", () => {
    viewModel.showModal.Value = false;
    systemUnderTest.onSpaceScored({
      currentScore: 100,
      requiredScore: 99,
      maxScore: 0,
      spaceID: 0,
    } as SpaceScoreTO);
    expect(viewModel.showModal.Value).toBe(true);
  });

  test("onSpaceScored should sets showModal to true if given score is equal to requiredScore", () => {
    viewModel.showModal.Value = false;
    systemUnderTest.onSpaceScored({
      currentScore: 100,
      requiredScore: 100,
      maxScore: 0,
      spaceID: 0,
    } as SpaceScoreTO);
    expect(viewModel.showModal.Value).toBe(true);
  });

  test("onSpaceScored doesn't set showModal if given score is smaller than requiredScore", () => {
    viewModel.showModal.Value = false;
    systemUnderTest.onSpaceScored({
      currentScore: 100,
      requiredScore: 101,
      maxScore: 0,
      spaceID: 0,
    } as SpaceScoreTO);
    expect(viewModel.showModal.Value).toBe(false);
  });
});
