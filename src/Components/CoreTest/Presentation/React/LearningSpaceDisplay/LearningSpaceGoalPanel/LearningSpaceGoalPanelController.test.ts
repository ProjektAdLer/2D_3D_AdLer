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

  test("openPanel sets isOpen in viewmodel to true", () => {
    viewModelMock.isOpen.Value = false;
    systemUnderTest = new LearningSpaceGoalPanelController(viewModelMock);
    systemUnderTest.openPanel();
    expect(viewModelMock.isOpen.Value).toBeTruthy();
  });

  test("openOrCloseGoals inverts value of isOpen in viewmodel", () => {
    viewModelMock.isOpen.Value = true;
    systemUnderTest = new LearningSpaceGoalPanelController(viewModelMock);
    systemUnderTest.openOrCloseGoals();
    expect(viewModelMock.isOpen.Value).toBeFalsy();

    systemUnderTest.openOrCloseGoals();
    expect(viewModelMock.isOpen.Value).toBeTruthy();
  });
});
