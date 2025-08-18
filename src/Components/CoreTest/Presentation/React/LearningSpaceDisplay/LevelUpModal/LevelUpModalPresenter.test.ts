import LevelUpModalPresenter from "../../../../../Core/Presentation/React/LearningSpaceDisplay/LevelUpModal/LevelUpModalPresenter";
import LevelUpModalViewModel from "../../../../../Core/Presentation/React/LearningSpaceDisplay/LevelUpModal/LevelUpModalViewModel";

describe("LevelUpModalPresenter", () => {
  let systemUnderTest: LevelUpModalPresenter;
  let viewModel: LevelUpModalViewModel;

  beforeEach(() => {
    viewModel = new LevelUpModalViewModel();
    systemUnderTest = new LevelUpModalPresenter(viewModel);
  });

  test("onExperiencePointsUpdated should not set isOpen to true if level up is not reached", () => {
    viewModel = new LevelUpModalViewModel();
    viewModel.isOpen.Value = false;
    systemUnderTest = new LevelUpModalPresenter(viewModel);
    const xpTO = {
      numberOfLevelUps: 0,
    };

    systemUnderTest.onExperiencePointsUpdated(xpTO);
    expect(viewModel.isOpen.Value).toBeFalsy();
  });

  test("onExperiencePointsUpdated should set isOpen to true if level up is reached", () => {
    viewModel = new LevelUpModalViewModel();
    viewModel.isOpen.Value = false;
    systemUnderTest = new LevelUpModalPresenter(viewModel);
    const xpTO = {
      numberOfLevelUps: 1,
    };

    systemUnderTest.onExperiencePointsUpdated(xpTO);
    expect(viewModel.isOpen.Value).toBeTruthy();
  });

  test("onExperiencePointsUpdated should set level to 0 if current level is negative", () => {
    viewModel = new LevelUpModalViewModel();
    viewModel.isOpen.Value = false;
    systemUnderTest = new LevelUpModalPresenter(viewModel);
    const xpTO = {
      numberOfLevelUps: 1,
      currentLevel: -1,
    };

    systemUnderTest.onExperiencePointsUpdated(xpTO);
    expect(viewModel.level).toBe(0);
  });
  test("onExperiencePointsUpdated should set level to 10 if current level is negative", () => {
    viewModel = new LevelUpModalViewModel();
    viewModel.isOpen.Value = false;
    systemUnderTest = new LevelUpModalPresenter(viewModel);
    const xpTO = {
      numberOfLevelUps: 1,
      currentLevel: 15,
    };

    systemUnderTest.onExperiencePointsUpdated(xpTO);
    expect(viewModel.level).toBe(10);
  });

  test("onLearningWorldEntityLoaded should set worldTheme", () => {
    viewModel = new LevelUpModalViewModel();
    viewModel.worldTheme = "";
    systemUnderTest = new LevelUpModalPresenter(viewModel);
    const lwTO = {
      theme: "Theme 1",
    };

    systemUnderTest.onLearningWorldEntityLoaded(lwTO);
    expect(viewModel.worldTheme).toBe("Theme 1");
  });
});
