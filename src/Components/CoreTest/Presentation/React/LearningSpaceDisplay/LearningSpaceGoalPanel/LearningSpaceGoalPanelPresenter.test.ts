import LearningSpaceGoalPanelViewModel from "../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningSpaceGoalPanel/LearningSpaceGoalPanelViewModel";
import LearningSpaceGoalPanelPresenter from "../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningSpaceGoalPanel/LearningSpaceGoalPanelPresenter";
import LearningSpaceTO from "../../../../../Core/Application/DataTransferObjects/LearningSpaceTO";

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
      requirements: "",
      requiredScore: 0,
      currentScore: 0,
      maxScore: 0,
    };

    systemUnderTest.onLearningSpaceLoaded(spaceTO);

    expect(vm.goals.Value).toEqual(goal);
  });
});
