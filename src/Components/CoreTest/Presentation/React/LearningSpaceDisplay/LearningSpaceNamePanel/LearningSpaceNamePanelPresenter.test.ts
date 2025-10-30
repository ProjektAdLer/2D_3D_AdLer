import LearningSpaceTO from "../../../../../Core/Application/DataTransferObjects/LearningSpaceTO";
import LearningWorldTO from "../../../../../Core/Application/DataTransferObjects/LearningWorldTO";
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
      requiredScore: 0,
      currentScore: 0,
      maxScore: 0,
    } as any as LearningSpaceTO;

    systemUnderTest.onLearningSpaceLoaded(spaceTO);
    expect(vm.name.Value).toEqual(testName);
  });

  test("should set the name of the parent world in the vm ", () => {
    const testName = "Test";
    const worldTO: LearningWorldTO = {
      id: 0,
      name: testName,
    } as any as LearningWorldTO;

    systemUnderTest.onLearningWorldEntityLoaded(worldTO);
    expect(vm.parentWorldName).toEqual(testName);
  });
});
