import LearningSpaceGoalPanelController from "../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningSpaceGoalPanel/LearningSpaceGoalPanelController";
import LearningSpaceGoalPanelViewModel from "../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningSpaceGoalPanel/LearningSpaceGoalPanelViewModel";

const viewModelMock = new LearningSpaceGoalPanelViewModel();
describe("LearningSpaceGoalPanelController", () => {
  let systemUnderTest: LearningSpaceGoalPanelController;
  test("closePanel sets isOpen in viewmodel to false", () => {
    viewModelMock.isOpen.Value = true;
    systemUnderTest = new LearningSpaceGoalPanelController(viewModelMock);
    systemUnderTest.closePanel();
    expect(viewModelMock.isOpen.Value).toBeFalsy();
  });
});
