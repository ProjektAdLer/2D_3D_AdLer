import IElementsDropdownPresenter from "../../../../../Core/Presentation/React/SpaceDisplay/ElementsDropdown/IElementsDropdownPresenter";
import ElementsDropdownViewModel from "../../../../../Core/Presentation/React/SpaceDisplay/ElementsDropdown/ElementsDropdownViewModel";
import ElementsDropdownPresenter from "../../../../../Core/Presentation/React/SpaceDisplay/ElementsDropdown/ElementsDropdownPresenter";
describe("ElementsDropDownPresenter", () => {
  let systemUnderTest: IElementsDropdownPresenter;
  let vm: ElementsDropdownViewModel;
  beforeEach(() => {
    vm = new ElementsDropdownViewModel();
    systemUnderTest = new ElementsDropdownPresenter(vm);
  });

  test("should set the  Elements in the ViewModel", () => {
    const elements = [
      {
        id: 1,
        name: "Test",
        elementData: {
          type: "text",
        },
      },
    ];
    systemUnderTest.presentElements(elements);
    expect(vm.elements.Value).toBe(elements);
  });
});
