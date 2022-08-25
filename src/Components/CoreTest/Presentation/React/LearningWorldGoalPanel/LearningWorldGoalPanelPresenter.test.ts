import type ILearningWorldGoalPanelPresenter from "../../../../../../src/Components/Core/Presentation/React/LearningWorldGoalPanel/ILearningWorldGoalPanelPresenter";
import LearningWorldGoalPanelViewModel from "../../../../../../src/Components/Core/Presentation/React/LearningWorldGoalPanel/LearningWorldGoalPanelViewModel";
import LearningWorldGoalPanelPresenter from "../../../../../../src/Components/Core/Presentation/React/LearningWorldGoalPanel/LearningWorldGoalPanelPresenter";
describe("LearningWorldGoalPanel", () => {
  let systemUnderTest: ILearningWorldGoalPanelPresenter;
  let vm: LearningWorldGoalPanelViewModel;

  beforeEach(() => {
    vm = new LearningWorldGoalPanelViewModel();
    systemUnderTest = new LearningWorldGoalPanelPresenter(vm);
  });

  test("should set the Goal of the world in the vm ", () => {
    systemUnderTest.displayWorldGoal("Test World");
    expect(vm.worldGoal.Value).toBe("Test World");
  });
});
