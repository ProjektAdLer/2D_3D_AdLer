import SpaceCompletionModalPresenter from "../../../../../Core/Presentation/React/SpaceDisplay/SpaceCompletionModal/SpaceCompletionModalPresenter";
import SpaceCompletionModalViewModel from "../../../../../Core/Presentation/React/SpaceDisplay/SpaceCompletionModal/SpaceCompletionModalViewModel";

describe("SpaceCompletionModalPresenter", () => {
  let viewModel: SpaceCompletionModalViewModel;
  let systemUnderTest: SpaceCompletionModalPresenter;

  beforeEach(() => {
    viewModel = new SpaceCompletionModalViewModel();
    systemUnderTest = new SpaceCompletionModalPresenter(viewModel);
  });

  test("onScoreChanged should set score in the viewmodel to the given score", () => {
    systemUnderTest.onScoreChanged(100, 0, 0, 0);
    expect(viewModel.score.Value).toBe(100);
  });

  test("onScoreChanged should set maxScore in the viewmodel to the given maxScore", () => {
    systemUnderTest.onScoreChanged(0, 0, 100, 0);
    expect(viewModel.maxScore.Value).toBe(100);
  });

  test("onScoreChanged should set requiredScore in the viewmodel to the given requiredScore", () => {
    systemUnderTest.onScoreChanged(0, 100, 0, 0);
    expect(viewModel.requiredScore.Value).toBe(100);
  });

  test("onScoreChanged should sets showModal to true if given score is bigger than requiredScore", () => {
    viewModel.showModal.Value = false;
    systemUnderTest.onScoreChanged(100, 99, 0, 0);
    expect(viewModel.showModal.Value).toBe(true);
  });

  test("onScoreChanged should sets showModal to true if given score is equal to requiredScore", () => {
    viewModel.showModal.Value = false;
    systemUnderTest.onScoreChanged(100, 100, 0, 0);
    expect(viewModel.showModal.Value).toBe(true);
  });

  test("onScoreChanged doesn't set showModal if given score is smaller than requiredScore", () => {
    viewModel.showModal.Value = false;
    systemUnderTest.onScoreChanged(100, 101, 0, 0);
    expect(viewModel.showModal.Value).toBe(false);
  });
});
