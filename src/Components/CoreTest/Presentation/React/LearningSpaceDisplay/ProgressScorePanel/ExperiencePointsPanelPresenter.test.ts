import ExperiencePointsTO from "../../../../../Core/Application/DataTransferObjects/ExperiencePointsTO";
import ExperiencePointsPanelPresenter from "../../../../../Core/Presentation/React/LearningSpaceDisplay/ProgressScorePanel/ExperiencePointsPanel/ExperiencePointsPanelPresenter";
import ExperiencePointsPanelViewModel from "../../../../../Core/Presentation/React/LearningSpaceDisplay/ProgressScorePanel/ExperiencePointsPanel/ExperiencePointsPanelViewModel";

describe("ExperiencePointsPanelPresenter", () => {
  let systemUnderTest: ExperiencePointsPanelPresenter;
  let viewModel: ExperiencePointsPanelViewModel;

  beforeEach(() => {
    viewModel = new ExperiencePointsPanelViewModel();
    systemUnderTest = new ExperiencePointsPanelPresenter(viewModel);
  });

  test("should update experience information", () => {
    const xpTO: ExperiencePointsTO = {
      maxLevel: 3,
      currentLevel: 1,
      currentExperiencePoints: 120,
      numberOfLevelUps: 0,
    };

    systemUnderTest.onExperiencePointsUpdated(xpTO);
    expect(viewModel.xpInfo.Value).toEqual({
      maxLevel: 3,
      currentLevel: 1,
      currentXP: 20,
      numberOfLevelUps: 0,
    });
  });
});
