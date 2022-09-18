import type IWorldNamePanelPresenter from "../../../../../../../src/Components/Core/Presentation/React/SpaceDisplay/WorldNamePanel/IWorldNamePanelPresenter";
import WorldNamePanelViewModel from "../../../../../../../src/Components/Core/Presentation/React/SpaceDisplay/WorldNamePanel/WorldNamePanelViewModel";
import WorldNamePanelPresenter from "../../../../../../../src/Components/Core/Presentation/React/SpaceDisplay/WorldNamePanel/WorldNamePanelPresenter";
describe("WorldNamePanel", () => {
  let systemUnderTest: IWorldNamePanelPresenter;
  let vm: WorldNamePanelViewModel;

  beforeEach(() => {
    vm = new WorldNamePanelViewModel();
    systemUnderTest = new WorldNamePanelPresenter(vm);
  });

  test("should set the name of the world in the vm ", () => {
    systemUnderTest.displayWorldName("Test World");
    expect(vm.worldName.Value).toBe("Test World");
  });
});
