import SpaceGoalPanelViewModel from "../../../../../Core/Presentation/React/SpaceDisplay/SpaceGoalPanel/SpaceGoalPanelViewModel";
import SpaceGoalPanelPresenter from "../../../../../Core/Presentation/React/SpaceDisplay/SpaceGoalPanel/SpaceGoalPanelPresenter";
import SpaceTO from "../../../../../Core/Application/DataTransferObjects/SpaceTO";

describe("WorldGoalPanel", () => {
  let systemUnderTest: SpaceGoalPanelPresenter;
  let vm: SpaceGoalPanelViewModel;

  beforeEach(() => {
    vm = new SpaceGoalPanelViewModel();
    systemUnderTest = new SpaceGoalPanelPresenter(vm);
  });

  test("should set the Goal of the world in the vm ", () => {
    const goal = "Test";
    const spaceTO: SpaceTO = {
      id: 0,
      name: "",
      elements: [],
      description: "",
      goals: goal,
      requirements: [],
      requiredScore: 0,
      currentScore: 0,
      maxScore: 0,
    };

    systemUnderTest.onSpaceLoaded(spaceTO);

    expect(vm.goal.Value).toEqual(goal);
  });
});
