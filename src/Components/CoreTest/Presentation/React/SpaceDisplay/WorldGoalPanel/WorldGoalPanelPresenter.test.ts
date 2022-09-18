import type IWorldGoalPanelPresenter from "../../../../../../../src/Components/Core/Presentation/React/SpaceDisplay/WorldGoalPanel/IWorldGoalPanelPresenter";
import WorldGoalPanelViewModel from "../../../../../../../src/Components/Core/Presentation/React/SpaceDisplay/WorldGoalPanel/WorldGoalPanelViewModel";
import WorldGoalPanelPresenter from "../../../../../../../src/Components/Core/Presentation/React/SpaceDisplay/WorldGoalPanel/WorldGoalPanelPresenter";
describe("WorldGoalPanel", () => {
  let systemUnderTest: IWorldGoalPanelPresenter;
  let vm: WorldGoalPanelViewModel;

  beforeEach(() => {
    vm = new WorldGoalPanelViewModel();
    systemUnderTest = new WorldGoalPanelPresenter(vm);
  });

  test("should set the Goal of the world in the vm ", () => {
    systemUnderTest.displayWorldGoal("Test World");
    expect(vm.worldGoal.Value).toBe("Test World");
  });
});
