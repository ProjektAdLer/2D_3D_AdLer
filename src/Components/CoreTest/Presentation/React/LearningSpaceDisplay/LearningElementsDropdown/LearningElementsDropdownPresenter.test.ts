import LearningElementsDropdownViewModel from "../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningElementsDropdown/LearningElementsDropdownViewModel";
import LearningElementsDropdownPresenter from "../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningElementsDropdown/LearningElementsDropdownPresenter";
import LearningSpaceTO from "../../../../../Core/Application/DataTransferObjects/LearningSpaceTO";
import LearningElementTO from "../../../../../Core/Application/DataTransferObjects/LearningElementTO";

describe("LearningElementsDropDownPresenter", () => {
  let systemUnderTest: LearningElementsDropdownPresenter;
  let vm: LearningElementsDropdownViewModel;

  beforeEach(() => {
    vm = new LearningElementsDropdownViewModel();
    systemUnderTest = new LearningElementsDropdownPresenter(vm);
  });

  test("should set the Learning Elements in the ViewModel", () => {
    const elements: LearningElementTO[] = [
      {
        id: 1,
        name: "Test",
        value: 0,
        parentSpaceID: 0,
        parentWorldID: 0,
        description: "",
        goals: [""],
        type: "video",
        hasScored: false,
      },
    ];

    const spaceTO: LearningSpaceTO = {
      id: 0,
      name: "",
      elements: elements,
      description: "",
      goals: [""],
      requirements: "",
      requiredScore: 0,
      currentScore: 0,
      maxScore: 0,
    };

    systemUnderTest.onLearningSpaceLoaded(spaceTO);

    expect(vm.elements.Value).toBe(elements);
  });
});
