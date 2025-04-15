import CinemaStripesPresenter from "../../../../../Core/Presentation/React/LearningSpaceDisplay/CinemaStripes/CinemaStripesPresenter";
import CinemaStripesViewModel from "../../../../../Core/Presentation/React/LearningSpaceDisplay/CinemaStripes/CinemaStripesViewModel";

describe("CinemaStripesPresenter", () => {
  let systemUnderTest: CinemaStripesPresenter;
  let viewModel: CinemaStripesViewModel;

  beforeEach(() => {
    systemUnderTest = new CinemaStripesPresenter(new CinemaStripesViewModel());
    viewModel = systemUnderTest["viewModel"];
  });

  test("onStoryElementCutSceneTriggered sets isOpen to true", () => {
    viewModel.isOpen.Value = false;
    systemUnderTest.onStoryElementCutSceneTriggered("test");
    expect(viewModel.isOpen.Value).toBe(true);
  });

  test("onStoryElementCutSceneFinished sets isOpen to false", () => {
    viewModel.isOpen.Value = true;
    systemUnderTest.onStoryElementCutSceneFinished();
    expect(viewModel.isOpen.Value).toBe(false);
  });
});
