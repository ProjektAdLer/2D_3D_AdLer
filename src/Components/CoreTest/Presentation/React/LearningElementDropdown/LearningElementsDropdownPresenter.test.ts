import ILearningElementsDropdownPresenter from "../../../../Core/Presentation/React/LearningElementsDropdown/ILearningElementsDropdownPresenter";
import LearningElementsDropdownViewModel from "../../../../Core/Presentation/React/LearningElementsDropdown/LearningElementsDropdownViewModel";
import LearningElementDropdownPresenter from "../../../../Core/Presentation/React/LearningElementsDropdown/LearningElementsDropdownPresenter";
describe("LearningElementsDropDownPresenter", () => {
  let systemUnderTest: ILearningElementsDropdownPresenter;
  let vm: LearningElementsDropdownViewModel;
  beforeEach(() => {
    vm = new LearningElementsDropdownViewModel();
    systemUnderTest = new LearningElementDropdownPresenter(vm);
  });

  test("should set the Learning Elements in the ViewModel", () => {
    const learningElements = [
      {
        id: 1,
        name: "Test",
        learningElementData: {
          type: "text",
        },
      },
    ];
    systemUnderTest.presentLearningElements(learningElements);
    expect(vm.learningElements.Value).toBe(learningElements);
  });
});
