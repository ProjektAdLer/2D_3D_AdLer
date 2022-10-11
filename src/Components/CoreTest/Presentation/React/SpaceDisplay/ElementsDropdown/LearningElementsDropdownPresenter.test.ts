import ElementsDropdownViewModel from "../../../../../Core/Presentation/React/SpaceDisplay/ElementsDropdown/ElementsDropdownViewModel";
import ElementsDropdownPresenter from "../../../../../Core/Presentation/React/SpaceDisplay/ElementsDropdown/ElementsDropdownPresenter";
import SpaceTO from "../../../../../Core/Application/DataTransferObjects/SpaceTO";
import ElementTO from "../../../../../Core/Application/DataTransferObjects/ElementTO";
describe("ElementsDropDownPresenter", () => {
  let systemUnderTest: ElementsDropdownPresenter;
  let vm: ElementsDropdownViewModel;
  beforeEach(() => {
    vm = new ElementsDropdownViewModel();
    systemUnderTest = new ElementsDropdownPresenter(vm);
  });

  test("should set the  Elements in the ViewModel", () => {
    const elements: ElementTO[] = [
      {
        id: 1,
        name: "Test",
        value: 0,
        parentSpaceId: 0,
        parentCourseId: 0,
        description: "",
        goals: "",
        type: "video",
      },
    ];

    const spaceTO: SpaceTO = {
      id: 0,
      name: "",
      elements: elements,
      description: "",
      goals: "",
      requirements: [],
      requiredPoints: 0,
    };

    systemUnderTest.onSpaceDataLoaded(spaceTO);
    expect(vm.elements.Value).toBe(elements);
  });
});
