import LearningSpaceTO from "../../../../../Core/Application/DataTransferObjects/LearningSpaceTO";
import LearningWorldTO from "../../../../../Core/Application/DataTransferObjects/LearningWorldTO";
import SideBarPresenter from "../../../../../Core/Presentation/React/LearningSpaceDisplay/SideBar/SideBarPresenter";
import SideBarViewModel from "../../../../../Core/Presentation/React/LearningSpaceDisplay/SideBar/SideBarViewModel";

describe("SideBarPresenter", () => {
  let systemUnderTest: SideBarPresenter;

  let vm = new SideBarViewModel();
  beforeEach(() => {
    vm = new SideBarViewModel();
    systemUnderTest = new SideBarPresenter(vm);
  });
  test("onLearningWorldLoaded sets allowWorldCompletionModalButtonClick", () => {
    const worldTO = {
      completionModalShown: false,
      spaces: [
        {
          id: 1,
          currentScore: 1,
          requiredScore: 1,
        } as LearningSpaceTO,
        {
          id: 2,
          currentScore: 1,
          requiredScore: 1,
        } as LearningSpaceTO,
      ],
    } as LearningWorldTO;
    systemUnderTest.onLearningWorldLoaded(worldTO);
    expect(vm.allowWorldCompletionModalButtonClick).toBe(true);
  });
  test("OnLearningWorldScored sets allowWorldCompletionModalButtonClick", () => {
    const worldScoreTo = {
      worldID: 1,
      currentScore: 1,
      requiredScore: 1,
    };
    systemUnderTest.onLearningWorldScored(worldScoreTo);
    expect(vm.allowWorldCompletionModalButtonClick).toBe(true);
  });

  test("onNarrativeFrameworkInfoLoadedOrUpdated sets allowNarrativeFrameworkIntroButtonClick", () => {
    systemUnderTest.onNarrativeFrameworkInfoLoadedOrUpdated({});
    expect(vm.allowNarrativeFrameworkIntroButtonClick).toBe(true);
  });
});
