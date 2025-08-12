import LearningSpaceGoalPanelViewModel from "../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningSpaceGoalPanel/LearningSpaceGoalPanelViewModel";
import LearningSpaceGoalPanelPresenter from "../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningSpaceGoalPanel/LearningSpaceGoalPanelPresenter";
import LearningSpaceTO from "../../../../../Core/Application/DataTransferObjects/LearningSpaceTO";
import { LearningSpaceTemplateType } from "../../../../../Core/Domain/Types/LearningSpaceTemplateType";
import { ThemeType } from "../../../../../Core/Domain/Types/ThemeTypes";

describe("LearningSpaceGoalPanel", () => {
  let systemUnderTest: LearningSpaceGoalPanelPresenter;
  let vm: LearningSpaceGoalPanelViewModel;

  beforeEach(() => {
    vm = new LearningSpaceGoalPanelViewModel();
    systemUnderTest = new LearningSpaceGoalPanelPresenter(vm);
  });

  test("should set the Goal of the world in the vm ", () => {
    const goal = ["Test"];
    const spaceTO: LearningSpaceTO = {
      id: 0,
      name: "",
      elements: [],
      description: "",
      goals: goal,
      requiredScore: 0,
      currentScore: 0,
      maxScore: 0,
      requirementsString: "",
      requirementsSyntaxTree: null,
      isAvailable: false,
      template: LearningSpaceTemplateType.None,
      theme: ThemeType.Arcade,
    } as any as LearningSpaceTO;

    systemUnderTest.onLearningSpaceLoaded(spaceTO);

    expect(vm.goals.Value).toEqual(goal);
  });
  test("openOrCloseModal should set the isOpen of the vm accordingly", () => {
    vm.isOpen.Value = false;
    systemUnderTest.openOrCloseGoals();
    expect(vm.isOpen.Value).toBeTruthy();
    systemUnderTest.openOrCloseGoals();
    expect(vm.isOpen.Value).toBeFalsy();
  });
});
