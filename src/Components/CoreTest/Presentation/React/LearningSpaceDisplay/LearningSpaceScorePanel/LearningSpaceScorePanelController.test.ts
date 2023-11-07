import { mock } from "jest-mock-extended";
import ILearningSpaceGoalPanelPresenter from "../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningSpaceGoalPanel/ILearningSpaceGoalPanelPresenter";
import LearningSpaceScorePanelController from "../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningSpaceScorePanel/LearningSpaceScorePanelController";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import PRESENTATION_TYPES from "../../../../../Core/DependencyInjection/Presentation/PRESENTATION_TYPES";

const spaceGoalPresenterMock = mock<ILearningSpaceGoalPanelPresenter>();
describe("LearningSpaceScorePanelController", () => {
  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.unbindAll();
    CoreDIContainer.bind(
      PRESENTATION_TYPES.ILearningSpaceGoalPanelPresenter
    ).toConstantValue(spaceGoalPresenterMock);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  let systemUnderTest: LearningSpaceScorePanelController;
  test("panelClicked calls spaceGoalPresenter", () => {
    systemUnderTest = new LearningSpaceScorePanelController();
    systemUnderTest.panelClicked();
    expect(spaceGoalPresenterMock.openOrCloseGoals).toHaveBeenCalledTimes(1);
  });
});
