import LearningSpaceTO from "../../../../../Core/Application/DataTransferObjects/LearningSpaceTO";
import LearningSpaceNamePanelPresenter from "../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningSpaceNamePanel/LearningSpaceNamePanelPresenter";
import LearningSpaceNamePanelViewModel from "../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningSpaceNamePanel/LearningSpaceNamePanelViewModel";

describe("LearningWorldNamePanel", () => {
  let systemUnderTest: LearningSpaceNamePanelPresenter;
  let vm: LearningSpaceNamePanelViewModel;

  beforeEach(() => {
    vm = new LearningSpaceNamePanelViewModel();
    systemUnderTest = new LearningSpaceNamePanelPresenter(vm);
  });

  test("should set the name of the world in the vm ", () => {
    const testName = "Test";
    const spaceTO: LearningSpaceTO = {
      id: 0,
      name: testName,
      elements: [],
      description: "",
      goals: [""],
      requirements: "",
      requiredScore: 0,
      currentScore: 0,
      maxScore: 0,
    };

    systemUnderTest.onLearningSpaceLoaded(spaceTO);
    expect(vm.name.Value).toEqual(testName);
  });
});
