import SpaceTO from "../../../../../Core/Application/DataTransferObjects/SpaceTO";
import SpaceNamePanelPresenter from "../../../../../Core/Presentation/React/SpaceDisplay/SpaceNamePanel/SpaceNamePanelPresenter";
import SpaceNamePanelViewModel from "../../../../../Core/Presentation/React/SpaceDisplay/SpaceNamePanel/SpaceNamePanelViewModel";

describe("WorldNamePanel", () => {
  let systemUnderTest: SpaceNamePanelPresenter;
  let vm: SpaceNamePanelViewModel;

  beforeEach(() => {
    vm = new SpaceNamePanelViewModel();
    systemUnderTest = new SpaceNamePanelPresenter(vm);
  });

  test("should set the name of the world in the vm ", () => {
    const testName = "Test";
    const spaceTO: SpaceTO = {
      id: 0,
      name: testName,
      elements: [],
      description: "",
      goals: "",
      requirements: [],
      requiredPoints: 0,
    };

    systemUnderTest.onSpaceDataLoaded(spaceTO);
    expect(vm.name.Value).toEqual(testName);
  });
});
