import LevelUpModalPresenter from "../../../../../Core/Presentation/React/LearningSpaceDisplay/LevelUpModal/LevelUpModalPresenter";
import LevelUpModalViewModel from "../../../../../Core/Presentation/React/LearningSpaceDisplay/LevelUpModal/LevelUpModalViewModel";

describe("LevelUpModalPresenter", () => {
  let systemUnderTest: LevelUpModalPresenter;
  let viewModel: LevelUpModalViewModel;

  beforeEach(() => {
    viewModel = new LevelUpModalViewModel();
    systemUnderTest = new LevelUpModalPresenter(viewModel);
  });

  test("should not set isOpen to true if level up is reached", () => {
    viewModel = new LevelUpModalViewModel();
    viewModel.isOpen.Value = false;
    systemUnderTest = new LevelUpModalPresenter(viewModel);
    const xpTO = {
      numberOfLevelUps: 0,
    };

    systemUnderTest.onExperiencePointsUpdated(xpTO);
    expect(viewModel.isOpen.Value).toBeFalsy();
  });

  test("should set isOpen to true if level up is reached", () => {
    viewModel = new LevelUpModalViewModel();
    viewModel.isOpen.Value = false;
    systemUnderTest = new LevelUpModalPresenter(viewModel);
    const xpTO = {
      numberOfLevelUps: 1,
    };

    systemUnderTest.onExperiencePointsUpdated(xpTO);
    expect(viewModel.isOpen.Value).toBeTruthy();
  });
});
