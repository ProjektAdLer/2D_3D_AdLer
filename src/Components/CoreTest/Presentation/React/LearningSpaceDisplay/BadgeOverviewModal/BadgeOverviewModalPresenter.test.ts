import BadgeOverviewModalPresenter from "../../../../../Core/Presentation/React/LearningSpaceDisplay/BadgeOverviewModal/BadgeOverviewModalPresenter";
import BadgeOverviewModalViewModel from "../../../../../Core/Presentation/React/LearningSpaceDisplay/BadgeOverviewModal/BadgeOverviewModalViewModel";

describe("BadgeOverviewModalPresenter", () => {
  let systemUnderTest: BadgeOverviewModalPresenter;
  let vm: BadgeOverviewModalViewModel;

  beforeEach(() => {
    vm = new BadgeOverviewModalViewModel();
    systemUnderTest = new BadgeOverviewModalPresenter(vm);
  });

  test("openModal sets isOpen to true", () => {
    vm.isOpen.Value = false;
    systemUnderTest.openModal();
    expect(vm.isOpen.Value).toBe(true);
  });
  test("onLearningWorldEntityLoaded sets theme correctly", () => {
    const learningWorldTO = {
      theme: "CampusAB",
    } as any;
    vm.worldTheme = "Default";
    systemUnderTest.onLearningWorldEntityLoaded(learningWorldTO);
    expect(vm.worldTheme).toBe("CampusAB");
  });
  test("onExperiencePointsUpdated sets currentLevel correctly", () => {
    const experiencePointsTO = {
      currentLevel: 5,
    } as any;
    vm.currentLevel.Value = 1;
    systemUnderTest.onExperiencePointsUpdated(experiencePointsTO);
    expect(vm.currentLevel.Value).toBe(5);
  });
});
